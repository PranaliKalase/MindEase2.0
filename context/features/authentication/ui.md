# AUTHENTICATION - UI

## Purpose

Document the user interface for the Authentication flows.

## Scope

- Login Page
- Register Page
- Reset Password Page

## Main Content

**Login Page (`/login`)**
- Form containing Email and Password inputs.
- OAuth buttons for Google and GitHub.
- Link to "Forgot Password".
- Uses dark glassmorphism styling consistent with the MindEase design system.

**Register Page (`/register`)**
- Form containing Full Name, Email, and Password inputs.
- OAuth buttons for Google and GitHub.
- Transitions seamlessly using the `page-zoom-out` transition context.

**Reset Password Page (`/reset-password`)**
- Input for Email address to receive a recovery link.

## Related Files

- `frontend/src/pages/Login/LoginPage.tsx`
- `frontend/src/pages/Register/RegisterPage.tsx`
- `frontend/src/pages/ResetPassword.tsx`

## Future Improvements

To be defined

## Last Updated
2026-08-02
