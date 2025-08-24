import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	// eslint-disable-next-line no-console
	console.warn('Supabase env vars missing. Provide Supabase URL and anon key environment variables.');
}

export const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');
