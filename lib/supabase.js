import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kcykhllevdmupldrzroz.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_wQKqhSiImVFjGlIwQIzvUQ_BzZFZh4j';

export const supabase = createClient(supabaseUrl, supabaseKey);
