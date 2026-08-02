# DASHBOARD - README

## Purpose

The Dashboard acts as the primary "Sanctuary" for the authenticated user, providing a central hub for all mental wellness tools.

## Scope

- AI Companion Chat UI
- Daily Guided Journal UI
- Mood Log Selector
- 432Hz Ambient Soundscape Player

## Main Content

The Dashboard is currently implemented as a comprehensive UI presentation layer (`DashboardPage.tsx`). It features interactive widgets that allow users to chat, log moods, play ambient audio, and write journal entries. 
*Note: The current implementation focuses on the UI state and interactions; persistent backend integrations for these specific tools (chat logs, journal saves) are pending.*

## Related Files

- `frontend/src/pages/Dashboard/DashboardPage.tsx`

## Future Improvements

- Connect AI Chat to a real LLM backend.
- Persist Daily Journal entries to the Supabase database.
- Save Mood logs historically.
- Integrate real streaming audio for the soundscape player.

## Last Updated
2026-08-02
