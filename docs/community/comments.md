# 💬 Nested Comments Threading & Interaction

## 1. Comment System Overview

Comments in MindEase are designed as **constructive, supportive discussions**. They encourage deep empathy and prevent toxic pile-ons.

```text
Post Card Body
│
├── [Comment 1] MountainMist (3 hours ago)
│   "Box breathing has worked wonders for me during presentations..."
│   └── 💬 Reply | ❤️ Helpful (4) | 🤝 Relate (2) | 🚩 Report
│       │
│       └── [Nested Reply] CalmSoul21 (Author)
│           "Thank you so much! How many seconds do you count for inhale?"
│           └── 💬 Reply | ❤️ Helpful (1)
│
└── [Comment 2] HopefulHeart (2 hours ago)
    "Small steps are still steps forward. You've got this!"
    └── 💬 Reply | 🌸 Encouraged (6)
```

---

## 2. Technical Features

- **Nested Hierarchy**: Up to 3 levels of nested replies with soft visual guide lines (`border-l border-white/10`).
- **Collapse/Expand Thread**: Long comment branches (>4 replies) automatically collapse under a `Show 3 more replies` button to keep the feed clean.
- **AI Comment Moderation**: Every comment passes through lightweight AI toxicity scanning before rendering. Hostile or invalid comments are hidden automatically.
- **Author Tag**: Post author comments display an `Author` badge in soft lavender (`#B79CFF`).
- **Supportive Comment Reactions**: Readers can react to individual comments with `Helpful`, `Relate`, `Encouraged`, or `Thank You`.
