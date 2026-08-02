# Authentication - UI

## Purpose

Define the visual design, layout, and user experience for all authentication screens while preserving the existing authentication functionality.

---

## Screens

- Login
- Register
- Reset Password

---

## Login Page

### Objective

Create a premium, calming, and immersive authentication experience that reflects the MindEase brand.

---

### Reference Design

The approved reference image is the visual specification.

The implementation should closely match:

- Split-screen layout
- Glassmorphism
- Purple theme
- Cosmic background
- Soft glow effects
- Rounded corners
- Premium spacing and typography

---

### Desktop Layout

A centered glassmorphism container divided into two sections.

#### Left Panel

Contains:

- MindEase animation
- Cosmic background
- Ambient glow
- Floating particles
- "Back to Sanctuary" button

Animation Asset

/public/videos/authentication/login-animation.mp4

Video Settings

- autoplay
- muted
- loop
- playsInline

---

#### Right Panel

Contains:

- MindEase Logo
- Welcome text
- Email field
- Password field
- Remember Me
- Forgot Password
- Sign In button
- Google Sign In
- Create Account link

Authentication functionality must remain unchanged.

---

## Visual Style

- Dark theme
- Glassmorphism
- Purple accents
- Soft shadows
- Rounded corners
- Calm premium aesthetic

---

## Responsive

Desktop

- Two-column layout

Tablet

- Reduced animation size

Mobile

- Hide animation panel
- Display only the login form

---

## Register Page

Uses the same layout and design language as Login with registration-specific fields.

---

## Reset Password Page

Uses the same authentication layout with an email recovery form.

---

## Related Components

- AuthLayout
- AnimationPanel
- LoginForm
- RegisterForm
- ResetPasswordForm

---

## Related Files

- frontend/src/pages/Login/LoginPage.tsx
- frontend/src/pages/Register/RegisterPage.tsx
- frontend/src/pages/ResetPassword.tsx

---

## Status

Planned redesign