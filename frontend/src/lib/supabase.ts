import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  if (!rawUrl || !rawKey) return false;
  if (
    rawUrl.includes('your-project') ||
    rawUrl.includes('placeholder') ||
    rawUrl.includes('shxsqqyjwimzbvijyuxe')
  ) {
    return false;
  }
  if (
    rawKey.includes('your-anon-key') ||
    rawKey.includes('placeholder') ||
    rawKey.startsWith('sb_publishable_d941')
  ) {
    return false;
  }
  if (!rawKey.startsWith('eyJ')) {
    return false;
  }
  return true;
};

const supabaseUrl = isSupabaseConfigured() ? rawUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = isSupabaseConfigured() ? rawKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
