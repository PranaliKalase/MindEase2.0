# Authentication

## Purpose

Detail the technical engineering decisions behind the authentication system.

## Scope

- Supabase Integration
- Error Handling
- Demo Mode

## Main Content

**Supabase Integration**
The application uses `@supabase/supabase-js` initialized in `lib/supabase.ts`. It strictly separates service logic (`services/auth.ts`) from state management (`context/AuthContext.tsx`).

**Error Handling Strategy**
Raw Supabase errors are captured in `auth.ts` and passed through a `formatAuthError()` utility. This translates cryptic backend messages (like `invalid_credentials`) into friendly, user-facing text before it reaches the UI components.

**Demo Mode Resilience**
In `services/auth.ts`, the system checks `isSupabaseConfigured()`. If the developer has not provided valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the `.env` file (e.g., they are placeholder strings), the authentication service gracefully falls back to generating mock `user` and `session` objects. This allows UI/UX development to continue seamlessly without a backend connection.

## Related Files

- `context/features/authentication/implementation.md`

## Future Improvements

To be defined

## Last Updated
2026-08-02
