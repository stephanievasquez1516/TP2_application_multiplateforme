import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gzciyhemanisqlpmpmxw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Ii0GLThIuMUvnc4F6ajKzw_k-HFAK3m'; // Celle qui commence par eyJ

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);