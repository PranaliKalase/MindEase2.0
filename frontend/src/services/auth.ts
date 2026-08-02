import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | Error | null;
  message?: string;
}

/**
 * Validate password requirements:
 * - Minimum 8 characters
 * - One uppercase
 * - One lowercase
 * - One number
 */
export const validatePassword = (password: string): string | null => {
  if (!password || password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number.';
  }
  return null;
};

/**
 * Format raw Supabase auth error into friendly user-facing messages
 */
export const formatAuthError = (error: AuthError | Error | null): string => {
  if (!error) return '';
  const msg = error.message.toLowerCase();

  if (msg.includes('invalid login credentials') || msg.includes('invalid_credentials')) {
    return 'Invalid email or password. Please check your credentials and try again.';
  }
  if (msg.includes('user already registered') || msg.includes('already registered')) {
    return 'An account with this email already exists. Please sign in instead.';
  }
  if (msg.includes('password should be at least')) {
    return 'Password must be at least 8 characters long with uppercase, lowercase, and numbers.';
  }
  if (msg.includes('email not confirmed')) {
    return 'Please verify your email address before logging in.';
  }
  if (msg.includes('failed to fetch') || msg.includes('networkerror') || msg.includes('network error')) {
    if (!isSupabaseConfigured()) {
      return 'Supabase URL & Anon Key required. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in frontend/.env.';
    }
    return 'Network connection error. Please check your internet connection and try again.';
  }
  return error.message || 'An unexpected authentication error occurred. Please try again.';
};

/**
 * Helper to generate mock user for local demo testing when credentials are not configured
 */
const createMockUser = (email: string, fullName?: string): { user: User; session: Session } => {
  const mockUser = {
    id: 'demo-user-id-' + Date.now(),
    app_metadata: { provider: 'email' },
    user_metadata: { full_name: fullName || email.split('@')[0] },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    email: email,
    phone: '',
    role: 'authenticated',
    updated_at: new Date().toISOString(),
  } as unknown as User;

  const mockSession = {
    access_token: 'demo-access-token',
    token_type: 'bearer',
    expires_in: 3600,
    refresh_token: 'demo-refresh-token',
    user: mockUser,
  } as Session;

  return { user: mockUser, session: mockSession };
};

/**
 * Email & Password Login
 */
export const signInWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  if (!isSupabaseConfigured()) {
    const { user, session } = createMockUser(email);
    return { user, session, error: null };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      return { user: null, session: null, error, message: formatAuthError(error) };
    }
    return { user: data.user, session: data.session, error: null };
  } catch (err: any) {
    return { user: null, session: null, error: err, message: formatAuthError(err) };
  }
};

/**
 * Email & Password Sign Up with Full Name validation & metadata
 */
export const signUpWithEmail = async (
  email: string,
  password: string,
  fullName: string
): Promise<AuthResponse> => {
  // Validate Password rules
  const pwdErr = validatePassword(password);
  if (pwdErr) {
    return { user: null, session: null, error: new Error(pwdErr), message: pwdErr };
  }

  if (!isSupabaseConfigured()) {
    const { user, session } = createMockUser(email, fullName);
    return { user, session, error: null, message: 'Account created successfully! (Demo Mode)' };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      return { user: null, session: null, error, message: formatAuthError(error) };
    }

    // Insert user into profiles table
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert([
          {
            id: data.user.id,
            full_name: fullName.trim(),
            email: email.trim(),
            avatar: '',
            created_at: new Date().toISOString(),
          }
        ], { onConflict: 'id', ignoreDuplicates: true });

      if (profileError) {
        console.error('Error creating profile row:', profileError);
      }
    }

    const needsEmailConfirmation = data.user && !data.session;
    return {
      user: data.user,
      session: data.session,
      error: null,
      message: needsEmailConfirmation
        ? 'Please verify your email.'
        : 'Account created successfully!',
    };
  } catch (err: any) {
    return { user: null, session: null, error: err, message: formatAuthError(err) };
  }
};

/**
 * Google OAuth Login
 */
export const signInWithGoogle = async (): Promise<AuthResponse> => {
  if (!isSupabaseConfigured()) {
    const { user, session } = createMockUser('google.user@mindease.com', 'Google User');
    return { user, session, error: null };
  }

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      return { user: null, session: null, error, message: formatAuthError(error) };
    }
    return { user: null, session: null, error: null };
  } catch (err: any) {
    return { user: null, session: null, error: err, message: formatAuthError(err) };
  }
};

/**
 * Send Password Reset Email
 */
export const sendPasswordReset = async (email: string): Promise<AuthResponse> => {
  if (!isSupabaseConfigured()) {
    return {
      user: null,
      session: null,
      error: null,
      message: 'Password reset email sent! Please check your inbox.',
    };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      return { user: null, session: null, error, message: formatAuthError(error) };
    }
    return {
      user: null,
      session: null,
      error: null,
      message: 'Password reset email sent! Please check your inbox.',
    };
  } catch (err: any) {
    return { user: null, session: null, error: err, message: formatAuthError(err) };
  }
};

/**
 * Update Password for Authenticated User
 */
export const updateUserPassword = async (newPassword: string): Promise<AuthResponse> => {
  const pwdErr = validatePassword(newPassword);
  if (pwdErr) {
    return { user: null, session: null, error: new Error(pwdErr), message: pwdErr };
  }

  if (!isSupabaseConfigured()) {
    return {
      user: null,
      session: null,
      error: null,
      message: 'Your password has been updated successfully!',
    };
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      return { user: null, session: null, error, message: formatAuthError(error) };
    }
    return {
      user: data.user,
      session: null,
      error: null,
      message: 'Your password has been updated successfully!',
    };
  } catch (err: any) {
    return { user: null, session: null, error: err, message: formatAuthError(err) };
  }
};

/**
 * Logout User
 */
export const signOutUser = async (): Promise<{ error: Error | null }> => {
  if (!isSupabaseConfigured()) {
    return { error: null };
  }
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err: any) {
    return { error: err };
  }
};

/**
 * Update User Profile row in profiles table
 */
export const updateUserProfileRow = async (userId: string, data: { full_name?: string; avatar?: string }): Promise<{ error: Error | null }> => {
  if (!isSupabaseConfigured()) return { error: null };
  try {
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId);
    return { error };
  } catch (err: any) {
    return { error: err };
  }
};
