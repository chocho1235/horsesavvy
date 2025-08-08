import { getSupabaseAdmin, requireAdmin, verifyAdmin, json } from './_utils/auth.js';

// Updates status/payment_status for bookings, course_bookings, or camp_bookings
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }
  if (!requireAdmin(req, res)) return json(res, 401, { error: 'unauthorised', details: verifyAdmin(req) });

  const { table, id, update } = req.body || {};
  const allowedTables = new Set(['bookings', 'course_bookings', 'camp_bookings']);
  const allowedFields = new Set(['status', 'payment_status', 'notes', 'confirmed_at']);

  if (!allowedTables.has(table) || !id || typeof update !== 'object') {
    return json(res, 400, { error: 'Invalid request' });
  }

  // Whitelist fields
  const payload = {};
  for (const [k, v] of Object.entries(update)) {
    if (allowedFields.has(k)) payload[k] = v;
  }
  if (Object.keys(payload).length === 0) {
    return json(res, 400, { error: 'No valid fields to update' });
  }

  try {
    const sb = getSupabaseAdmin();
    const { error } = await sb.from(table).update(payload).eq('id', id);
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { success: true });
  } catch (e) {
    return json(res, 500, { error: 'Internal error' });
  }
}


