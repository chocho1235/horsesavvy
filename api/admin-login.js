import { hashAdminPassword, createAdminSession, json } from './_utils/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const { password } = req.body || {};
    if (!password || typeof password !== 'string') {
      return json(res, 400, { error: 'invalid_request' });
    }
    const configuredHash = process.env.VITE_ADMIN_PASSWORD_HASH;
    if (!configuredHash) {
      return json(res, 500, { error: 'server_not_configured', missing: ['VITE_ADMIN_PASSWORD_HASH'] });
    }

    const computed = hashAdminPassword(password);
    if (computed !== configuredHash) {
      return json(res, 401, { success: false, error: 'bad_credentials' });
    }

    createAdminSession(res);
    return json(res, 200, { success: true });
  } catch (e) {
    return json(res, 500, { error: 'exception', message: String(e?.message || e) });
  }
}


