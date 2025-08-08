import { clearAdminSession, json } from './_utils/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }
  clearAdminSession(res);
  return json(res, 200, { success: true });
}


