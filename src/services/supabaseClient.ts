import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://twhuiaokjdubxbcchamm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3aHVpYW9ramR1YnhiY2NoYW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNTgwODEsImV4cCI6MjA2MzkzNDA4MX0.pdOdD5B5BI_d7LdqgiJBDza4VBk0BHZe7X97uzpiy4g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 