import { getSupabaseAdmin } from './_utils/auth.js';

// Keepalive endpoint that actually calls Supabase every week to prevent 30-day pause
export default async function handler(req, res) {
  try {
    // Check if we should make a Supabase call (every 7 days to stay well under 30-day limit)
    const lastCallKey = 'last_supabase_keepalive';
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    
    // For now, always make the call in development
    // In production, you'd store this timestamp in a database or environment variable
    const shouldCallSupabase = process.env.NODE_ENV === 'development' || 
                              !process.env[lastCallKey] || 
                              (Date.now() - parseInt(process.env[lastCallKey] || '0')) > sevenDaysMs;
    
    if (shouldCallSupabase) {
      console.log('Making Supabase keepalive call to prevent 30-day pause...');
      
      const supabase = getSupabaseAdmin();
      
      // Make a simple query to keep the connection warm
      const { data, error } = await supabase
        .from('bookings')
        .select('id')
        .limit(1);
      
      if (error) {
        console.error('Supabase keepalive error:', error);
        return res.status(500).json({ 
          ok: false, 
          error: 'Supabase connection failed',
          t: Date.now() 
        });
      }
      
      console.log('Supabase keepalive successful - project will not be paused');
      
      // In production, you'd update the timestamp here
      // For now, just log it
      console.log('Last Supabase keepalive:', new Date().toISOString());
    }
    
    return res.status(200).json({ 
      ok: true, 
      supabase_called: shouldCallSupabase,
      t: Date.now() 
    });
    
  } catch (error) {
    console.error('Keepalive error:', error);
    return res.status(500).json({ 
      ok: false, 
      error: error.message,
      t: Date.now() 
    });
  }
}


