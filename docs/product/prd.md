# Product Requirements Document (PRD)

## Product Name
Invoice Builder Web

## Version
0.1 — Initial Release

---

## Problem Statement

Small businesses and freelancers need a simple, reliable way to create and send professional invoices. Existing solutions are either too complex, too expensive, or not isolated enough per company.

---

## Target Users

- Small business owners
- Freelancers
- Accountants managing a single company

---

## Core Business Rules

1. **One user = one company**: A user account is strictly linked to a single company.
2. **Company-scoped data**: All invoices, statistics, and data are private to the user's company.
3. **Dashboard scope**: The dashboard only shows data for the active user's company — never global data.

---

## Feature List

### MVP Features

| Feature | Priority | Status |
|---------|----------|--------|
| User registration and login | P0 | PLANNED |
| Email verification | P0 | PLANNED |
| Company profile setup | P0 | PLANNED |
| Invoice CRUD | P0 | PLANNED |
| Invoice PDF export | P0 | PLANNED |
| Scoped dashboard | P0 | PLANNED |
| Account management | P1 | PLANNED |
| Company logo upload | P1 | PLANNED |
| Profile avatar upload | P2 | PLANNED |

### Future Features (Out of Scope for MVP)

- Invoice email delivery
- Payment tracking
- Multi-currency support
- Team / multi-user per company
- Recurring invoices
- OAuth / social login

---

## Success Criteria

- A user can register, set up their company, and create their first invoice in under 5 minutes.
- All invoice data is strictly isolated per company.
- PDF exports are professional and consistent with company branding.
