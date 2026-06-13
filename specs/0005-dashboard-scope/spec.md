# Spec: Dashboard Scope (0005-dashboard-scope)

## Status
`DRAFT` | `IN REVIEW` | `APPROVED` | `IMPLEMENTED`

> **Current Status:** DRAFT

---

## Problem Statement

The dashboard is the first screen users see after login. It must provide a clear, actionable summary of the company's invoice activity without ever leaking data from other companies.

---

## Goal

Render a scoped dashboard that shows:
- Invoice summary statistics (total, draft, published, this month)
- Recent invoices (last N invoices for the company)
- Quick actions (create invoice, view all invoices)

---

## High-Level Requirements

1. All dashboard data must be filtered by `company_id`.
2. The dashboard must never fetch all invoices globally.
3. Summary widgets must use indexed queries for performance.
4. All dashboard summary data must derive from the active company dataset only.
5. If a user has no company set up, they must be redirected to the company setup flow.
6. Dashboard data must be fetched via React Query with proper stale-time settings.

---

## Out of Scope (see scope.md)

- Global admin dashboard (future)
- Cross-company analytics (not supported)
- Real-time push updates (future)

---

## References

- [scope.md](./scope.md)
- [acceptance-criteria.md](./acceptance-criteria.md)
- [user-flows.md](./user-flows.md)
- [frontend-contract.md](./frontend-contract.md)
- [backend-contract.md](./backend-contract.md)
