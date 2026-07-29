import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  if (!rawUrl || !rawKey) return false;
  if (rawUrl.includes('your-project') || rawUrl.includes('placeholder')) return false;
  if (rawKey.includes('your-anon-key') || rawKey.includes('placeholder')) return false;
  return true;
};

const supabaseUrl = isSupabaseConfigured() ? rawUrl : 'https://shxsqqyjwimzbvijyuxe.supabase.co';
const supabaseAnonKey = isSupabaseConfigured() ? rawKey : 'sb_publishable_d941QoUYeop-PAX7MDnFcg_8uo16dfP';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
