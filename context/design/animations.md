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

---

# Authentication

## Login Page Animation

### Purpose

Provide a calming, immersive, and emotionally reassuring experience during the authentication process while reinforcing the MindEase brand identity.

### Animation Asset

Location:

C:\Users\SHREE\OneDrive\Desktop\Mindease1\MindEase2.0\frontend\public\assets\videos\login-animation.mp4

### Design Reference

The login page follows the approved split-screen authentication design.

The animation is displayed in the left panel as the primary visual element while the authentication form remains in the right panel.

### Placement

- Left side of the authentication screen
- Centered vertically
- Centered horizontally
- Occupies approximately 70% of the left panel
- Maintains consistent spacing from container edges

### Playback Behavior

- Autoplay
- Muted
- Loop continuously
- Plays inline
- No user interaction required

### Visual Effects

- Cosmic background
- Ambient glow
- Floating particles
- Purple and blue lighting
- Soft bloom effects
- Smooth transitions

### Motion Guidelines

The animation should feel:

- Calm
- Relaxing
- Gentle
- Slow
- Non-distracting
- Emotionally comforting

Avoid:

- Fast movement
- Flashing effects
- Sudden transitions
- Distracting visual elements

### Performance Requirements

- Pause when the browser tab is inactive
- Optimize video size for fast loading
- Lazy load when appropriate
- Maintain smooth playback
- Hide animation on mobile devices to improve performance

### Responsive Behavior

#### Desktop

- Fully visible
- Two-column authentication layout

#### Tablet

- Visible with reduced size
- Maintain split layout

#### Mobile

- Animation panel hidden
- Authentication form occupies full width

### Future Improvements

- Interactive breathing animation
- Dynamic particle effects
- Adaptive ambient lighting
- Theme-aware animation variations

## Related Files

- `frontend/src/routes/index.tsx`
- `frontend/src/components/common/ParticleCanvas.tsx`

## Future Improvements

To be defined

## Last Updated
2026-08-02
