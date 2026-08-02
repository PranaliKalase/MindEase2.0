# AUTHENTICATION - README

## Purpose

Provides a secure, robust authentication system allowing users to sign up, log in, and manage their sessions using email or OAuth providers.

## Scope

- Email and Password Authentication
- OAuth Integrations (Google, GitHub)
- Password Reset Flow
- Protected Routes Enforcement
- User Profile Creation on First Sign-in

## Main Content

The authentication system is built on top of Supabase Auth. It handles seamless token management, user state persistence via React Context API (`AuthContext`), and dynamic routing based on authentication status.

## Related Files

- `frontend/src/context/AuthContext.tsx`
- `frontend/src/services/auth.ts`
- `frontend/src/components/ProtectedRoute.tsx`

## Future Improvements

To be defined

## Last Updated
2026-08-02
