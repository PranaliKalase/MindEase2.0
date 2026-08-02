import React, { createContext, useEffect, useState, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  sendPasswordReset,
  signOutUser,
  updateUserProfileRow,
  type AuthResponse,
} from '../services/auth';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (email: string, password: string, fullName: string) => Promise<AuthResponse>;
  logout: () => Promise<{ error: Error | null }>;
  googleLogin: () => Promise<AuthResponse>;
  forgotPassword: (email: string) => Promise<AuthResponse>;
  updateProfile: (data: { full_name?: string; avatar?: string }) => Promise<{ error: Error | null }>;
  // Aliases for backwards compatibility
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, fullName: string) => Promise<AuthResponse>;
  signOut: () => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<AuthResponse>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper for automatic profile creation
  const ensureProfileExists = async (currentUser: User) => {
    try {
      const fullName = currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || '';
      const avatar = currentUser.user_metadata?.avatar || currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture || '';

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: currentUser.id,
          full_name: fullName,
          email: currentUser.email,
          avatar: avatar,
          created_at: currentUser.created_at || new Date().toISOString(),
        }, { onConflict: 'id', ignoreDuplicates: true });

      if (error) {
        console.error('Error verifying/creating profile on auth state change:', error);
      }
    } catch (err) {
      console.error('Failed to auto-create profile:', err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // 1. Restore session on refresh with getSession()
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
          if (session?.user) {
            await ensureProfileExists(session.user);
          }
        }
      } catch (err) {
        console.error('Error restoring session:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // 2. Real-time session persistence & auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (isMounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setLoading(false);
        }

        // Automatic Profile Creation for Sign in / OAuth
        if (currentSession?.user && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'USER_UPDATED')) {
          await ensureProfileExists(currentSession.user);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await signInWithEmail(email, password);
    if (res.user && res.session) {
      setUser(res.user);
      setSession(res.session);
    }
    return res;
  };

  const register = async (email: string, password: string, fullName: string) => {
    const res = await signUpWithEmail(email, password, fullName);
    if (res.user && res.session) {
      setUser(res.user);
      setSession(res.session);
    }
    return res;
  };

  const logout = async () => {
    const res = await signOutUser();
    setUser(null);
    setSession(null);
    return res;
  };

  const googleLogin = async () => {
    return await signInWithGoogle();
  };

  const forgotPassword = async (email: string) => {
    return await sendPasswordReset(email);
  };

  const updateProfile = async (data: { full_name?: string; avatar?: string }) => {
    if (!user) return { error: new Error('User not authenticated') };
    return await updateUserProfileRow(user.id, data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        login,
        register,
        logout,
        googleLogin,
        forgotPassword,
        updateProfile,
        // Aliases
        signIn: login,
        signUp: register,
        signOut: logout,
        resetPassword: forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
