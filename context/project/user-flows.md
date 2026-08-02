# User Flows

## Purpose

Map out how users navigate through the currently implemented portions of the application.

## Scope

- Authentication Flow
- Dashboard Access Flow

## Main Content

**1. Onboarding / Auth Flow**
1. User lands on `/` (Landing Page).
2. User clicks "Sign In" or "Get Started".
3. User triggers a cinematic transition (`page-zoom-out`) via `TransitionContext`.
4. User arrives at `/login` or `/register`.
5. User enters credentials or selects an OAuth provider.
6. Upon successful authentication, Supabase issues a session token.
7. `AuthContext` updates its state and upserts the user into the `profiles` table.
8. User is automatically redirected to `/dashboard`.

**2. Dashboard Access Flow (Protected Route)**
1. User attempts to navigate directly to `/dashboard`.
2. `ProtectedRoute` component intercepts the request.
3. It checks `AuthContext` for an active session.
4. If session exists: renders `DashboardPage`.
5. If no session exists: redirects seamlessly to `/login`.

## Related Files

- `frontend/src/routes/index.tsx`

## Future Improvements

To be defined

## Last Updated
2026-08-02
