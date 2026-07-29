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
      (_event, session) => {
        if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
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
