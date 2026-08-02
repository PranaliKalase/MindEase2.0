# Database

## Purpose

Document the current database schema implemented in Supabase.

## Scope

- Authentication
- Profiles

## Main Content

The database currently relies entirely on Supabase PostgreSQL.

**1. Authentication (`auth.users`)**
- Handled internally by Supabase.
- Stores secure credentials and identities (Google, GitHub).

**2. Profiles (`public.profiles`)**
- A table meant to hold public-facing user metadata, bridging the gap between secure auth and application logic.
- **Columns:**
  - `id` (UUID): Matches `auth.users.id`.
  - `full_name` (Text): Extracted from OAuth providers or signup form.
  - `email` (Text): User's email address.
  - `avatar_url` (Text): URL to user's profile picture.
  - `created_at` (Timestamp).

*Data is currently upserted automatically from the frontend via `AuthContext` during the sign-in event.*

## Related Files

To be defined

## Future Improvements

To be defined

## Last Updated
2026-08-02
