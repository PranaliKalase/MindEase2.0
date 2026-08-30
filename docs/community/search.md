# 🔍 Unified Search System Specification

## 1. Multi-Entity Search Architecture

The Search Bar in the top navigation bar enables full-text search across 4 core entities:

```text
[ Search community... (Ctrl + K) ]
├── Posts        (Full-text search on post body & title)
├── Topics       (Filter by hashtags e.g. #Mindfulness, #SleepTips)
├── Pseudonyms   (Search anonymous nicknames e.g. CalmSoul21)
└── Clubs        (Search clubs e.g. 📚 Book Club, 🧘 Yoga Club)
```

---

## 2. Privacy-Preserving Indexing

- **No Personal Identifiers**: Real user emails, IP addresses, and real names are excluded from search indexes.
- **Debounced Input**: Search query triggers after 300ms debounce to minimize network traffic.
- **Search History Privacy**: User search history is stored locally in device `localStorage` only and can be cleared with 1 click.
