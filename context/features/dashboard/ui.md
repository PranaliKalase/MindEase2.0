# DASHBOARD - UI

## Purpose

Document the visual and interactive elements of the Dashboard Sanctuary.

## Scope

- AI Chat UI
- Daily Journal UI
- Mood Log UI
- Soundscape Player UI

## Main Content

**Overall Aesthetic**
- Deep dark background (`#0B1026`) with ambient purple/pink glows.
- Particle Canvas running in the background.
- Glassmorphic cards with translucent borders.

**AI Companion Chat**
- A chat interface rendering messages between 'user' and 'ai'.
- Contains an input field and submit button.
- Currently uses a `setTimeout` to simulate AI responses with a supportive, empathetic tone.

**Daily Guided Journal**
- A textarea prompting the user (e.g., "What is one thing you are grateful for today?").
- A "Save Entry" button that shows a temporary success state (✓ Journal saved to Sanctuary) using local React state.

**Mood Log Selector**
- A list of moods (Serene, Calm & Peaceful, Thoughtful, Anxious, Exhausted).
- Selecting a mood highlights the button with a glowing gradient border.

**432Hz Ambient Soundscape Player**
- A play/pause toggle for "Forest Moonlight Harmony".
- Visual equalizer animation (bouncing bars) when the audio state is "playing".

## Related Files

- `frontend/src/pages/Dashboard/DashboardPage.tsx`

## Future Improvements

To be defined

## Last Updated
2026-08-02
