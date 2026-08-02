# Architecture

## Purpose

Describe the high-level system architecture of the current MindEase2.0 implementation.

## Scope

- System Architecture
- Frontend Architecture
- Data Flow

## Main Content

**System Architecture**
The application follows a standard Single Page Application (SPA) architecture combined with a Backend-as-a-Service (BaaS).
- **Client**: React SPA served via Vite.
- **Backend**: Supabase providing Authentication, Database (PostgreSQL), and auto-generated APIs.

**Frontend Architecture**
- **Routing Layer**: Managed by `React Router` in `src/routes/index.tsx`. Incorporates a custom `TransitionContext` for smooth cinematic page transitions.
- **State Layer**: Global state is kept minimal, currently utilizing `AuthContext` to provide the session user across the app tree.
- **Component Layer**: UI is separated into layout wrappers, generic components (`common/`), page-specific sections (`sections/`), and standalone pages (`pages/`).

**Data Flow (Authentication Example)**
1. UI Form (`LoginPage`) triggers service call (`auth.ts`).
2. Service executes Supabase SDK method (`signInWithPassword`).
3. Supabase validates and returns a session.
4. `AuthContext` listener (`onAuthStateChange`) detects the session.
5. `AuthContext` updates React state and upserts user data to the `profiles` table.
6. React Router `<ProtectedRoute>` allows access to `/dashboard`.

## Related Files

- `context/engineering/folder-structure.md`

## Future Improvements

To be defined

## Last Updated
2026-08-02
