# Animations

## Purpose

Document the motion guidelines and specific animations implemented in the project.

## Scope

- Page Transitions
- Canvas Animations
- Micro-interactions

## Main Content

**1. Cinematic Page Transitions (`page-zoom-out`)**
- Managed by `TransitionContext` in `routes/index.tsx`.
- When navigating to Auth pages, the entire viewport shrinks slightly (`page-zoom-out`) and an ambient light curtain pulses across the screen, creating a theatrical transition over 500ms.

**2. Intro & Canvas Animations**
- **IntroAnimation**: A fullscreen overlay that plays when the user first visits the Landing Page, fading out gracefully.
- **ParticleCanvas**: A reusable React component (`<ParticleCanvas />`) rendering a subtle, floating particle system in the background of the Landing and Dashboard pages to simulate a calm, living environment.

**3. Micro-interactions**
- **Audio Equalizer**: Bouncing bars (`animate-bounce` with staggered animation delays) inside the 432Hz Soundscape Player when active.
- **Status Indicators**: A pulsing emerald dot (`animate-pulse`) next to the user's name on the Dashboard to signify an active session.

## Related Files

- `frontend/src/routes/index.tsx`
- `frontend/src/components/common/ParticleCanvas.tsx`

## Future Improvements

To be defined

## Last Updated
2026-08-02
