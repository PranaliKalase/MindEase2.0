# 🔌 API & Real-time Subscriptions Specification

## 1. REST & Supabase Data Endpoints

### Post Management
- `GET /api/community/posts`: Fetch paginated sanctuary feed.
- `POST /api/community/posts`: Submit new post to AI Safety Pipeline.
- `GET /api/community/clubs/:clubId/posts`: Fetch feed for specific club (📚 Book, 🎵 Music, 📸 Photography, 🧘 Yoga).
- `POST /api/community/posts/:postId/reactions`: Toggle supportive reaction (helpful, relate, encouraged, thank_you).
- `POST /api/community/posts/:postId/comments`: Add nested reply to post.

---

## 2. Real-time WebSocket Subscriptions

Using Supabase Realtime Channels:

```typescript
const channel = supabase
  .channel('public:community_posts')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'community_posts', filter: 'ai_status=eq.APPROVED' },
    (payload) => {
      // Append newly approved post to top of feed
    }
  )
  .subscribe();
```
