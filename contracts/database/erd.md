# ERD — Entity Relationship Diagram

## Status: DRAFT

---

## Entity Overview

```
User ──────────────── Company
 │                       │
 │                    Invoice
 │                       │
 └─── Account         LineItem
```

---

## Entities

### `User` (managed by Supabase Auth)
- `id` UUID PK
- `email` TEXT UNIQUE
- `created_at` TIMESTAMP

### `Company`
- `id` UUID PK
- `user_id` UUID FK → User (UNIQUE — one company per user)
- `name` TEXT NOT NULL
- `address` TEXT NOT NULL
- `contact_number` TEXT
- `logo_url` TEXT
- `signatory_name` TEXT
- `signatory_title` TEXT
- `created_at` TIMESTAMP
- `updated_at` TIMESTAMP

### `Invoice`
- `id` UUID PK
- `company_id` UUID FK → Company (indexed)
- `invoice_number` TEXT NOT NULL
- `status` ENUM(DRAFT, PUBLISHED)
- `client_name` TEXT NOT NULL
- `client_address` TEXT
- `due_date` DATE NOT NULL
- `notes` TEXT
- `total_amount` DECIMAL
- `created_at` TIMESTAMP
- `updated_at` TIMESTAMP

UNIQUE: `(company_id, invoice_number)`

### `LineItem`
- `id` UUID PK
- `invoice_id` UUID FK → Invoice (indexed)
- `description` TEXT NOT NULL
- `quantity` DECIMAL NOT NULL
- `unit_price` DECIMAL NOT NULL
- `total` DECIMAL NOT NULL (computed: quantity × unit_price)
- `sort_order` INTEGER

### `Account` (user profile data beyond Auth)
- `id` UUID PK (same as User.id)
- `user_id` UUID FK → User UNIQUE
- `display_name` TEXT
- `avatar_url` TEXT
- `created_at` TIMESTAMP
- `updated_at` TIMESTAMP

---

## Key Constraints

1. `Company.user_id` is UNIQUE — one user, one company.
2. `Invoice.company_id` is always required and indexed.
3. `(company_id, invoice_number)` is a composite unique index.
4. `LineItem.invoice_id` cascade deletes with parent invoice.

---

## Indexes

| Table | Column | Type | Reason |
|-------|--------|------|--------|
| Invoice | company_id | BTREE | Required for company-scoped queries |
| Invoice | (company_id, status) | BTREE | Dashboard filter queries |
| Invoice | (company_id, created_at DESC) | BTREE | Recent invoices sort |
| LineItem | invoice_id | BTREE | Join performance |
| Company | user_id | BTREE | User → Company lookup |
