# Folder Structure

## Purpose

Document the structural conventions of the MindEase2.0 source code.

## Scope

- `frontend/src/`

## Main Content

The frontend source code is organized by technical concern and feature area:

```text
frontend/src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable React components
│   ├── common/      # Generic UI (e.g., ParticleCanvas)
│   ├── layout/      # Navbars, Footers
│   ├── sections/    # Large chunks for Landing Page
│   └── ui/          # Primitive UI elements
├── context/         # React Context providers (AuthContext)
├── hooks/           # Custom React hooks (useAuth)
├── layouts/         # Layout wrappers (e.g., AuthLayout)
├── lib/             # Third-party configurations (supabase.ts)
├── pages/           # Route entry points (Dashboard, Login, Landing)
├── routes/          # Route definitions and transitions (index.tsx)
├── services/        # External API communication (auth.ts)
└── styles/          # Global stylesheets
```

## Related Files

To be defined

## Future Improvements

To be defined

## Last Updated
2026-08-02
