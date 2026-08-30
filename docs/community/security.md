# 🔒 Security & Row Level Security (RLS) Specification

## 1. Security Architecture & Privacy Principles

MindEase Community operates under strict data minimization and encryption standards.

### Core Security Controls:

- **Row Level Security (RLS)**: Enforced directly on Supabase PostgreSQL tables.
- **Anonymous Identity Decoupling**: Public queries map `user_id` to public profile pseudonyms; raw authentication identities are isolated in protected auth tables.
- **Image EXIF Metadata Stripping**: Uploaded image files automatically strip GPS coordinates and camera serial numbers before storage bucket persistence.
- **Rate Limiting**: Post creation is rate-limited (max 5 posts per hour per user) to prevent spam bursts.
