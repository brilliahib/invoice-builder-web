# Spec: Account Management (0004-account-management)

## Status
`DRAFT` | `IN REVIEW` | `APPROVED` | `IMPLEMENTED`

> **Current Status:** DRAFT

---

## Problem Statement

Users need to manage their personal account details separately from company data. This includes profile name, avatar, and password changes.

---

## Goal

Provide an account management section where a user can:
- View and update their display name
- Upload a profile avatar (via Cloudinary)
- Change their password
- View their linked company

---

## High-Level Requirements

1. Account data is user-specific, not company-specific.
2. Avatar is stored via Cloudinary.
3. Password change must require the current password for confirmation.
4. The user must always see which company they are linked to.
5. Account deletion is a separate, clearly gated action.

---

## Out of Scope (see scope.md)

- Email change (future — requires re-verification)
- Account transfer between companies (not supported)
- Admin-level account management (future)

---

## References

- [scope.md](./scope.md)
- [acceptance-criteria.md](./acceptance-criteria.md)
- [user-flows.md](./user-flows.md)
- [api-contract.md](./api-contract.md)
- [database-contract.md](./database-contract.md)
