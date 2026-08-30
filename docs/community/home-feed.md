# 🌊 Home Feed Specification & Algorithm

## 1. Feed Ranking Philosophy

Unlike traditional platforms that optimize for outrage, controversy, or high comment friction to boost screen time, MindEase's Home Feed algorithm prioritizes **Empathy, Safety, and Relevance**.

### Scoring Formula:
$$\text{Score} = (\text{Relevance} \times 0.4) + (\text{Recency} \times 0.3) + (\text{KindnessScore} \times 0.2) - (\text{ToxicityRisk} \times 0.5)$$

- **Relevance**: Matches user's joined Clubs (Book, Music, Photography, Yoga) and selected wellness interest tags (#Mindfulness, #Sleep, etc.).
- **Recency**: Standard time decay function ($e^{-\lambda t}$).
- **KindnessScore**: Ratio of supportive reactions (Helpful, Relate, Encouraged, Thank You) to views.
- **ToxicityRisk**: Posts flagged by AI safety as borderline are demoted in feed rankings while awaiting moderation.

---

## 2. Feed Engine Features

- **Real-Time Hydration**: Supabase WebSocket subscriptions update the feed dynamically when new posts are approved by the AI safety pipeline.
- **Skeleton Loading State**: Smooth pulse skeleton cards with lavender/slate gradients prevent layout shift during fetch.
- **Infinite Scroll with Pagination**: Cursor-based pagination (`limit: 15` posts per chunk) with zero abrupt page shifts.
- **Filter Tabs**:
  - `Sanctuary Feed` (All approved community posts)
  - `My Clubs` (Filtered strictly to 📚 Book, 🎵 Music, 📸 Photography, and 🧘 Yoga Clubs)
  - `Topics` (Filtered by tags like #AnxietyRelief, #Mindfulness, #Journaling)
  - `Saved Posts` (Personal bookmarked posts)

---

## 3. Empty & Error States

- **Empty State**: Displays a serene SVG illustration with a calming message: *"Your sanctuary is quiet right now. Be the first to share a peaceful moment."* with a button to `Share a Thought`.
- **Network Retry**: Soft toast banner with a `Reconnect` button if connection drops.
