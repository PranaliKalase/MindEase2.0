# AUTHENTICATION - TESTING

## Purpose

Define the testing strategy for the Authentication module.

## Scope

- UI Verification (Split-screen layout)
- Responsive Design (Desktop, Tablet, Mobile)
- Animation Playback (Autoplay, Loop, Muted)
- Form Functionality (Login, Signup, Reset Password)
- Error Handling

## Main Content

### UI & Responsive Testing
- Verify that the split-screen layout displays correctly on desktop and tablet.
- Verify that the authentication card height is sufficient to display all form fields without scrolling on standard desktop resolutions.
- Verify that the animation panel hides on mobile devices and the form takes full width.
- Verify the MindEase animation (`/assets/videos/login-animation.mp4`) autoplays, loops, and is muted.

### Functional Testing
- Verify successful login redirects to `/dashboard`.
- Verify successful registration creates an account.
- Verify error messages display correctly for invalid credentials.

## Related Files

- `frontend/src/pages/Login/LoginPage.tsx`

## Future Improvements

- Add end-to-end (E2E) tests with Playwright or Cypress for authentication flows.

## Last Updated

2026-08-02
