# 🏠 Community Home Page Specification

## 1. Top Navigation Bar

The Top Navigation Bar sits sticky at the top of the sanctuary screen.

### Components:
- **Search Bar**: Centered rounded search input with `Search community...` placeholder supporting keyboard shortcut (`Ctrl + K`). Searches Posts, Topics, Anonymous Profiles, and Clubs.
- **Community Title**: `Hope Community` / MindEase Sanctuary branding.
- **Header Actions**:
  - 🔔 **Notifications**: Bell icon with small subtle glow indicator for unread updates.
  - ⚙️ **Settings**: Quick link to sanctuary & privacy preferences.
  - 👤 **Profile Avatar**: Current user's anonymous avatar leading to profile page.

---

## 2. Left Sidebar Navigation Hub

The Left Sidebar remains sticky while scrolling and acts as the navigation backbone.

### Structure:

```text
🏠 Home Feed
🔍 Explore
✍️ Create Post

────────────────────────────────────────
🌿 MY CLUBS
📚 Book Club         [• New Prompt]
🎵 Music Club        [• Playlist Updated]
📸 Photography Club  [• 3 New Photos]
🧘 Yoga Club         [• Daily Session]

➕ Discover More Clubs

Future Expansion Clubs:
🎨 Art Club | 🍳 Cooking Club | 🌱 Gardening Club
🎬 Movie Club | ✈️ Travel Club | 💻 Coding Club
📖 Study Circle | 🎮 Gaming Club

────────────────────────────────────────
🤝 Buddy
📝 Journal
💌 Future Letters
🧘 Relief Techniques
🤖 AI Assistant
🔔 Notifications
👤 Profile
⚙️ Settings

────────────────────────────────────────
[ USER COMPACT CARD ]
🌸 CalmSoul21
😊 Mood Today: Calm
[📖 Quick Journal]
```

---

## 3. Center Feed Container

Contains:
1. **Create Post Card**: Sticky/Top placement for quick sharing.
2. **Feed Filter Tabs**: `All Posts`, `My Clubs`, `Trending Topics`, `Saved`.
3. **Post Cards Stream**: Vertical stream with 20px–24px gaps, rounded corners, glassmorphism shadows.

---

## 4. Right Wellness Sidebar

Contains non-intrusive wellness widgets:
1. **Daily Reflection Card**: Displays today's mindfulness question (e.g., *"What is one thing that went better than expected today?"*) with a `Write Reflection` button.
2. **Trending Topics Widget**: Hashes for active topics (#Mindfulness, #SleepTips, #WorkLifeBalance, #Breathwork, #Journaling).
3. **Community Care Widget**: Displays collective empathy progress (*"Together we've shared 4,203 supportive moments today"* with a 75% progress bar).
