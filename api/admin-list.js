import { getSupabaseAdmin, requireAdmin, verifyAdmin, json } from './_utils/auth.js';

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return json(res, 401, { error: 'unauthorised', details: verifyAdmin(req) });

  const table = req.query?.table || req.body?.table;
  const allowedTables = new Set(['bookings', 'course_bookings', 'camp_bookings']);
  if (!table || !allowedTables.has(table)) return json(res, 400, { error: 'Invalid table' });

  try {
    const sb = getSupabaseAdmin();
    const { data, error } = await sb.from(table).select('*').order('created_at', { ascending: false });
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { data });
  } catch (e) {
    return json(res, 500, { error: 'Internal error' });
  }
}


