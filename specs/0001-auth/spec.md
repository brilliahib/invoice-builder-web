# Spec: Authentication (0001-auth)

## Status
`DRAFT` | `IN REVIEW` | `APPROVED` | `IMPLEMENTED`

> **Current Status:** DRAFT

---

## Problem Statement

Users need a secure way to register, log in, and manage their session in the application. Authentication is the gateway to all company-scoped features.

---

## Goal

Provide a complete authentication flow using Supabase Auth, including:
- User registration
- Email/password login
- Password reset
- Session management (persistent login)
- Logout

---

## High-Level Requirements

1. Users must register with email and password.
2. Users must verify their email before gaining access to the dashboard.
3. Users must be able to reset their password via email.
4. Session must persist across page refreshes.
5. Unauthenticated users must be redirected to the login page.
6. Authenticated users must be redirected away from auth pages.
7. Auth state must be accessible across the entire application.

---

## Out of Scope (see scope.md)

- OAuth / social login (future)
- Multi-factor authentication (future)
- Role-based access control (handled in company scoping)

---

## References

- [scope.md](./scope.md)
- [acceptance-criteria.md](./acceptance-criteria.md)
- [user-flows.md](./user-flows.md)
- [api-contract.md](./api-contract.md)
- [database-contract.md](./database-contract.md)
