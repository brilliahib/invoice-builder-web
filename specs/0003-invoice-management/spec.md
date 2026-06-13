# Spec: Invoice Management (0003-invoice-management)

## Status
`DRAFT` | `IN REVIEW` | `APPROVED` | `IMPLEMENTED`

> **Current Status:** DRAFT

---

## Problem Statement

Users need to create, manage, and export invoices. All invoices are private to the user's company. The company profile data is used as the document identity source.

---

## Goal

Provide full invoice lifecycle management:
- Create invoice (draft or published)
- View invoice list (scoped to company)
- View invoice detail
- Update invoice
- Delete invoice
- Export invoice as PDF

---

## High-Level Requirements

1. An invoice belongs to exactly one company.
2. Invoice list must be filtered by `company_id` — never return all invoices.
3. Invoice must support statuses: `DRAFT`, `PUBLISHED`.
4. Invoice header uses the company's name, address, logo, and signatory.
5. Invoice line items must support quantity, unit price, description, and calculated totals.
6. Invoice PDF export must reflect the exact invoice data at the time of export.
7. Invoice numbers must be unique per company.
8. Invoices in `PUBLISHED` status should not be editable (configurable rule).

---

## Out of Scope (see scope.md)

- Invoice payment tracking (future)
- Invoice email delivery (future)
- Multi-currency (future)
- Recurring invoices (future)

---

## References

- [scope.md](./scope.md)
- [acceptance-criteria.md](./acceptance-criteria.md)
- [user-flows.md](./user-flows.md)
- [api-contract.md](./api-contract.md)
- [database-contract.md](./database-contract.md)
