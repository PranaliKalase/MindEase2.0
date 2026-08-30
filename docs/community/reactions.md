# 🌸 Supportive Reactions & Kindness Metrics

## 1. Zero-Like Philosophy

MindEase completely replaces traditional "Likes", "Upvotes", and "Claps" with 4 explicit, empathy-focused reactions:

| Reaction | Emoji | Intent & Meaning | Weight in Kindness Score |
| :--- | :--- | :--- | :--- |
| **Helpful** | ❤️ | *"This post provided actionable advice, comfort, or insight."* | +3 pts |
| **I Relate** | 🤝 | *"I am going through or have experienced the exact same thing."* | +2 pts |
| **Encouraged Me**| 🌸 | *"This post gave me hope, positivity, or strength."* | +2 pts |
| **Thank You** | 🙏 | *"Gratitude for sharing this vulnerable experience."* | +3 pts |

---

## 2. Community Care & Kindness Telemetry

Reactions directly feed into aggregate community metrics displayed in the Right Wellness Sidebar:

- **People Helped**: Total `Helpful` reactions received across the platform today.
- **People Related**: Total `I Relate` interactions.
- **Community Kindness Score**: A real-time calculated metric representing the collective support shared today:

$$\text{Kindness Score} = (3 \times N_{\text{Helpful}}) + (2 \times N_{\text{Relate}}) + (2 \times N_{\text{Encouraged}}) + (3 \times N_{\text{ThankYou}})$$

---

## 3. Micro-Animations & Sound Aesthetics

- **Reaction Trigger**: Smooth scaling spring animation (Framer Motion `scale: [1, 1.25, 1]`) with a soft glow effect.
- **Sound Feedback**: Optional subtle 432Hz ambient chime when sending support (can be muted in settings).
- **Multi-select**: Users can select up to 2 distinct reactions per post if both apply (e.g. `Helpful` + `Thank You`).
