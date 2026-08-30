# ⚠️ Edge Cases & Error Handling Specification

## 1. Network & Offline Resilience

- **Optimistic UI Rollbacks**: When a user submits a reaction, the UI updates instantly. If network connection fails, the reaction count gently rolls back with a silent toast notice: *"Unable to sync reaction. Retrying when online."*
- **Offline Draft Persistence**: Unsaved drafts in the Create Post card are cached in `localStorage` every 5 seconds. If the browser tab crashes, the text is automatically restored on page reload.

---

## 2. Crisis & Safety Edge Cases

- **Immediate Crisis Override**: If AI Safety detects acute self-harm language (Score $> 0.85$), the system bypasses standard feed logic, locks post creation temporarily, and displays the 24/7 Crisis Resource Modal.
- **Spam & Toxic Flooding**: If an IP or user ID attempts to post more than 5 times in 10 minutes, the account enters a 30-minute cooldown period.
