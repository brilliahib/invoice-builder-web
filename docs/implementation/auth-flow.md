# Auth Flow

## Overview

Authentication is handled by Supabase Auth. This document describes the full auth lifecycle in the application.

---

## Registration Flow

```
User fills RegisterForm
  → Supabase signUp(email, password)
    → Supabase sends verification email
      → User is shown "Check your email" screen
        → User clicks verification link
          → Supabase verifies email, sets session cookie
            → User redirected to /dashboard/company (first-time setup)
```

---

## Login Flow

```
User fills LoginForm
  → Supabase signInWithPassword(email, password)
    → Supabase sets session cookie (sb-*)
      → Middleware validates cookie on next request
        → User redirected to /dashboard
```

---

## Password Reset Flow

```
User requests reset → Supabase sends reset email
  → User clicks link → Supabase opens reset page
    → User sets new password → Supabase updates credentials
      → Redirect to /auth/login
```

---

## Session Validation (Server-Side)

```
Request to /dashboard/*
  → middleware.ts reads sb-* cookie
    → createServerClient(supabase).auth.getSession()
      → No session? Redirect to /auth/login
      → Session valid? Allow request, pass user to Server Component
```

---

## Session Validation (Client-Side)

- React Query does not manage auth state
- Supabase client (`createBrowserClient`) provides `onAuthStateChange` listener
- A context provider (`AuthProvider`) wraps the app and exposes `user` state

---

## Key Files (to be created)

| File | Purpose |
|------|---------|
| `src/middleware.ts` | Route protection |
| `src/lib/supabase/client.ts` | Browser Supabase client |
| `src/lib/supabase/server.ts` | Server Supabase client |
| `src/features/auth/` | Auth forms, hooks, and actions |
