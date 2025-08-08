import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Supabase admin client (service role)
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

// Hashing aligned with generate-password-hash.js/simpleAuth
export function hashAdminPassword(password) {
  const masterKey = process.env.VITE_MASTER_KEY;
  const encryptionSalt = process.env.VITE_ENCRYPTION_SALT;
  const sessionSalt = process.env.VITE_SESSION_SALT;
  if (!masterKey || !encryptionSalt || !sessionSalt) {
    throw new Error('Missing VITE_MASTER_KEY / VITE_ENCRYPTION_SALT / VITE_SESSION_SALT');
  }

  const layer1 = crypto.createHash('sha256').update(password + encryptionSalt).digest('hex');
  const layer2 = crypto.createHash('sha256').update(layer1 + masterKey).digest('hex');
  const layer3 = crypto.pbkdf2Sync(layer2, sessionSalt, 1000, 32, 'sha256').toString('hex');
  return layer3;
}

// Minimal signed session cookie (HMAC)
const COOKIE_NAME = 'admin_session';

export function createAdminSession(res) {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.VITE_INTEGRITY_KEY;
  if (!secret) throw new Error('Missing ADMIN_JWT_SECRET');
  const exp = Date.now() + 60 * 60 * 1000; // 1 hour
  const nonce = crypto.randomBytes(12).toString('hex');
  const base = `${exp}.${nonce}`;
  const sig = crypto.createHmac('sha256', secret).update(base).digest('hex');
  const token = `${base}.${sig}`;
  const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production' || process.env.VERCEL === '1';
  const cookie = `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600; ${isProd ? 'Secure;' : ''}`;
  res.setHeader('Set-Cookie', cookie);
}

export function clearAdminSession(res) {
  const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production' || process.env.VERCEL === '1';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; ${isProd ? 'Secure;' : ''}`);
}

export function requireAdmin(req, res) {
  const check = verifyAdmin(req);
  return check.ok;
}

export function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

// Returns detailed reason for admin auth failure (for API error messages)
export function verifyAdmin(req) {
  try {
    const cookieHeader = req.headers.cookie || '';
    const match = cookieHeader.split(';').map(s => s.trim()).find(s => s.startsWith(`${COOKIE_NAME}=`));
    if (!match) return { ok: false, reason: 'cookie_missing' };
    const token = match.split('=')[1];
    const [expStr, nonce, sig] = token.split('.');
    const secret = process.env.ADMIN_JWT_SECRET || process.env.VITE_INTEGRITY_KEY;
    if (!secret) return { ok: false, reason: 'server_missing_secret' };
    if (!expStr || !nonce || !sig) return { ok: false, reason: 'token_malformed' };
    const base = `${expStr}.${nonce}`;
    const expected = crypto.createHmac('sha256', secret).update(base).digest('hex');
    if (expected !== sig) return { ok: false, reason: 'bad_signature' };
    const exp = parseInt(expStr, 10);
    if (Number.isNaN(exp)) return { ok: false, reason: 'exp_invalid' };
    if (Date.now() > exp) return { ok: false, reason: 'expired' };
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: 'exception', error: String(e?.message || e) };
  }
}


