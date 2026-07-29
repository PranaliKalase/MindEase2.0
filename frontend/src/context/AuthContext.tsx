import React, { createContext, useEffect, useState, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signInWithGitHub,
  sendPasswordReset,
  signOutUser,
  type AuthResponse,
} from '../services/auth';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, fullName: string) => Promise<AuthResponse>;
  signOut: () => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<AuthResponse>;
  googleLogin: () => Promise<AuthResponse>;
  githubLogin: () => Promise<AuthResponse>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // Restore active session on initial load
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
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

    // Listen to real-time auth changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }

        // Handle profile creation/verification for new users (e.g. after Google OAuth redirect)
        if (session?.user && (_event === 'SIGNED_IN' || _event === 'INITIAL_SESSION')) {
          try {
            const fullName = session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || '';
            const avatarUrl = session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || '';

            // Using upsert with 'id' as the conflict key ensures we don't create duplicates
            // We only insert if they don't exist (or update if you want to keep them in sync)
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert({
                id: session.user.id,
                full_name: fullName,
                email: session.user.email,
                avatar_url: avatarUrl,
                created_at: session.user.created_at || new Date().toISOString(),
              }, { onConflict: 'id', ignoreDuplicates: true });

            if (profileError) {
              console.error('Error verifying/creating profile on sign in:', profileError);
            }
          } catch (err) {
            console.error('Failed to create profile during auth state change:', err);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await signInWithEmail(email, password);
    if (res.user && res.session) {
      setUser(res.user);
      setSession(res.session);
    }
    return res;
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const res = await signUpWithEmail(email, password, fullName);
    if (res.user && res.session) {
      setUser(res.user);
      setSession(res.session);
    }
    return res;
  };

  const signOut = async () => {
    const res = await signOutUser();
    setUser(null);
    setSession(null);
    return res;
  };

  const resetPassword = async (email: string) => {
    return await sendPasswordReset(email);
  };

  const googleLogin = async () => {
    return await signInWithGoogle();
  };

  const githubLogin = async () => {
    return await signInWithGitHub();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        googleLogin,
        githubLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
