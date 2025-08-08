import { createClient } from '@supabase/supabase-js';
import { json, verifyAdmin } from './_utils/auth.js';

export default async function handler(req, res) {
  const config = {
    has_SUPABASE_URL: !!process.env.SUPABASE_URL || !!process.env.VITE_SUPABASE_URL,
    has_SERVICE_ROLE: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    has_ADMIN_JWT_SECRET: !!process.env.ADMIN_JWT_SECRET || !!process.env.VITE_INTEGRITY_KEY,
    has_VITE_MASTER_KEY: !!process.env.VITE_MASTER_KEY,
    has_VITE_ENCRYPTION_SALT: !!process.env.VITE_ENCRYPTION_SALT,
    has_VITE_SESSION_SALT: !!process.env.VITE_SESSION_SALT,
    has_VITE_INTEGRITY_KEY: !!process.env.VITE_INTEGRITY_KEY,
    has_VITE_ADMIN_PASSWORD_HASH: !!process.env.VITE_ADMIN_PASSWORD_HASH,
  };

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  let database = { ok: false };
  
  try {
    if (url && key) {
      console.log('Testing Supabase connection with:', { 
        url, 
        keyType: key.startsWith('sb_') ? 'new_format' : 'legacy_jwt',
        keyPrefix: key.substring(0, 20) + '...' 
      });
      
      const sb = createClient(url, key, { 
        auth: { persistSession: false },
        db: { schema: 'public' }
      });
      
      // Test basic connection first
      const { data, error } = await sb.from('bookings').select('id', { head: true, count: 'exact' }).limit(1);
      
      console.log('Supabase response:', { 
        hasData: !!data, 
        dataLength: data?.length, 
        error: error?.message || error,
        errorCode: error?.code
      });
      
      database = { 
        ok: !error, 
        error: error ? error.message : undefined, 
        data: data,
        errorCode: error?.code,
        keyType: key.startsWith('sb_') ? 'new_format' : 'legacy_jwt'
      };
    } else {
      database = { ok: false, error: 'Missing URL or key', url: !!url, key: !!key };
    }
  } catch (e) {
    console.error('Supabase connection error:', e);
    database = { 
      ok: false, 
      error: String(e?.message || e), 
      stack: e?.stack,
      keyType: key?.startsWith('sb_') ? 'new_format' : 'legacy_jwt'
    };
  }

  const auth = verifyAdmin(req);
  return json(res, 200, { config, database, auth });
}
