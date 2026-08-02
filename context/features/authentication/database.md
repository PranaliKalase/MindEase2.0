# AUTHENTICATION - DATABASE

## Purpose

Document the database structures supporting authentication and user profiles.

## Scope

- Supabase Auth schema
- `profiles` table

## Main Content

**Supabase Auth Schema (`auth.users`)**
- Managed entirely by Supabase.
- Stores user emails, encrypted passwords, and OAuth provider linkages.

**Profiles Table (`public.profiles`)**
- Created to extend the base authentication user with app-specific metadata.
- **Fields:**
  - `id` (UUID): Primary Key, matches `auth.users.id`.
  - `full_name` (Text): Extracted from signup form or OAuth metadata.
  - `email` (Text): User's email.
  - `avatar_url` (Text): Extracted from OAuth provider (e.g., Google/GitHub picture).
  - `created_at` (Timestamp).

*Note: Profiles are currently upserted directly from the frontend in `AuthContext.tsx` during the `SIGNED_IN` auth state change event.*

## Related Files

- `frontend/src/context/AuthContext.tsx`

## Future Improvements

To be defined

## Last Updated
2026-08-02
