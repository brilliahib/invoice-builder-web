# Spec: Company Management (0002-company-management)

## Status
`DRAFT` | `IN REVIEW` | `APPROVED` | `IMPLEMENTED`

> **Current Status:** DRAFT

---

## Problem Statement

Each user belongs to exactly one company. Company data is the identity source for invoices — it provides the company name, logo, address, contact, and signatory details used in invoice headers.

---

## Goal

Allow a user to create, view, and update their company profile. Company data must be consistently reflected across all invoices and PDF exports.

---

## High-Level Requirements

1. A user must be linked to exactly one company.
2. Company profile includes: name, address, contact number, logo, signatory name, signatory title.
3. Company logo is stored via Cloudinary.
4. Company data changes must immediately affect new invoices and PDF headers.
5. A user who has not set up a company must be prompted to do so before accessing the invoice section.

---

## Out of Scope (see scope.md)

- Multi-company support (future)
- Company invitation / team management (future)
- Company deletion (future)

---

## References

- [scope.md](./scope.md)
- [acceptance-criteria.md](./acceptance-criteria.md)
- [user-flows.md](./user-flows.md)
- [api-contract.md](./api-contract.md)
- [database-contract.md](./database-contract.md)
