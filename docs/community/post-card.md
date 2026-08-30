# 🎴 Premium Post Card Specification

## 1. Visual Architecture & Spacing

Each post in the MindEase Sanctuary feed is presented as a high-aesthetic, glassmorphism social card inspired by calm, premium typography.

### Dimensions & Styling:
- **Card Background**: `#182235` (Glass Card Blue) with `backdrop-blur-md`
- **Border**: `1px solid rgba(255, 255, 255, 0.1)`
- **Corner Radius**: `rounded-3xl` (24px)
- **Margin Between Cards**: `20px` to `24px` vertical spacing
- **Shadow**: `shadow-xl shadow-[#8A5CFF]/5`

```text
+-----------------------------------------------------------------------+
|  [Avatar]  CalmSoul21 [Verified Mentor Badge]           2 hours ago  •••|
|            Topic: Anxiety Relief  |  Mood: Calm  |  📚 Book Club     |
|-----------------------------------------------------------------------|
|  How do you all handle anxiety during work meetings? I find myself   |
|  getting really tense whenever I have to present...                   |
|                                                                       |
|  [ Optional Image with rounded-2xl corners & ambient shadow ]         |
|                                                                       |
|  🤖 AI Summary (For long posts > 300 words):                          |
|  "User seeks discreet grounding techniques for anxiety in meetings."   |
|-----------------------------------------------------------------------|
|  💬 14 Answers   |   ❤️ 28 Helped   |   🤝 12 Relate   |   🔖  |   🚩   |
+-----------------------------------------------------------------------+
```

---

## 2. Card Header Component

- **Avatar**: 44px circular pseudonymous avatar with subtle gradient ring (`#B79CFF`).
- **Nickname**: `CalmSoul21` (Customizable anonymous alias).
- **Verified Mentor Badge**: Displayed if user is a certified mental health peer or mentor (small mint green shield check icon).
- **Time Stamp**: Relative human-readable time (`2 hours ago`).
- **Metadata Badges**:
  - `Topic Tag`: Soft blue background (`#7DD3FC/15`) e.g. `Topic: Anxiety Relief`.
  - `Mood Badge`: Mood indicator e.g. `Mood: Calm`.
  - `Club Badge`: Displayed if post belongs to a club e.g. `📚 Book Club`.
- **Three-Dot Action Menu**: Save, Copy Link, Mute Topic, Report Post.

---

## 3. Card Body Component

- **Post Content**: Clean typography with 1.6 line height for effortless reading. Links automatically rendered with external safety warnings.
- **Image Attachment**: Clean 16:9 or 4:3 rounded media container (`rounded-2xl`) with hover zoom transition.
- **AI Summary Block**: Automatically generated for long posts (>300 words) inside a soft collapsible glass box.

---

## 4. Supportive Action Footer (Zero Likes System)

Instead of traditional like counts, the footer features non-dopaminergic supportive reactions:

- 💬 **Answers / Comments**: Shows total response count (`14 Answers`).
- ❤️ **Helpful**: Count of users who found the post helpful (`28 Helped`).
- 🤝 **I Relate**: Count of users who shared the feeling (`12 Relate`).
- 🌸 **Encouraged Me**: Count of users inspired by the post.
- 🙏 **Thank You**: Gratitude reaction.
- 🔖 **Save**: Bookmark for personal wellness review.
- 🚩 **Report**: Discreet flagging trigger.
