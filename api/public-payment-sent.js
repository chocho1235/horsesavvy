import { getSupabaseAdmin, json } from './_utils/auth.js';

// Public endpoint to mark a course booking as payment_sent by reference
// Harmless: does not confirm/approve, only marks intent; admin must confirm later
export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const { reference } = req.body || {};
  if (!reference || typeof reference !== 'string' || reference.length < 6) {
    return json(res, 400, { error: 'Invalid reference' });
  }

  try {
    const sb = getSupabaseAdmin();
    const { error } = await sb
      .from('course_bookings')
      .update({ status: 'payment_sent' })
      .eq('reference', reference);
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { success: true });
  } catch (e) {
    return json(res, 500, { error: 'Internal error' });
  }
}


