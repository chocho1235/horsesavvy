import { getSupabaseAdmin, json } from './_utils/auth.js';

// Returns current active booking count for a clinic id
export default async function handler(req, res) {
  const clinicType = (req.query?.clinicType || req.body?.clinicType || '').toString();
  if (!clinicType) return json(res, 400, { error: 'clinicType required' });
  try {
    const sb = getSupabaseAdmin();
    const { count, error } = await sb
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('clinic_type', clinicType)
      .not('status', 'in', '("cancelled","declined")');
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { count: count || 0 });
  } catch (e) {
    return json(res, 500, { error: 'Internal error' });
  }
}


