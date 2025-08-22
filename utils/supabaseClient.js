// utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;          // matches the key you set in Vercel
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;     // matches the key you set in Vercel

export const supabase = createClient(supabaseUrl, supabaseKey);
