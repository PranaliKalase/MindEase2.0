# AUTHENTICATION - IMPLEMENTATION

## Purpose

Details the exact technical implementation of the Authentication feature based on current source code.

## Scope

- `AuthContext.tsx`
- `auth.ts` service
- `ProtectedRoute.tsx`

## Main Content

**AuthContext (`AuthContext.tsx`)**
- Initializes auth state on mount using `supabase.auth.getSession()`.
- Sets up an active listener via `supabase.auth.onAuthStateChange`.
- **Profile Upsertion**: When a user signs in or signs up successfully (especially via OAuth), the listener extracts metadata (like `full_name` and `avatar_url`) and upserts a record into the `profiles` table using their auth `id`.

**Auth Service (`auth.ts`)**
- Wraps Supabase Auth SDK calls.
- Provides friendly error formatting via `formatAuthError()`.
- Exports functions: `signInWithEmail`, `signUpWithEmail`, `signInWithGoogle`, `signInWithGitHub`, `sendPasswordReset`, `updateUserPassword`, `signOutUser`.
- **Demo Mode Fallback**: If `VITE_SUPABASE_URL` is not configured, it generates mock `user` and `session` objects to allow UI development without a connected backend.

**Protected Route (`ProtectedRoute.tsx`)**
- A wrapper component that checks the `session` from `useAuth()`.
- If no session exists, it redirects the user to `/login` using React Router.

## Related Files

To be defined

## Future Improvements

To be defined

## Last Updated
2026-08-02
