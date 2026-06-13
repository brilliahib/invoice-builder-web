# Form Contracts

## Form Contract Format

Each form contract defines:
- **Form name**
- **Route/page**
- **Fields** (name, type, validation)
- **Submission behavior**
- **Error handling**

---

## LoginForm

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `email` | email | Yes | Valid email format |
| `password` | password | Yes | Min 8 characters |

**Submission:** Calls Supabase `signInWithPassword`. On success → redirect to `/dashboard`.

---

## RegisterForm

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `email` | email | Yes | Valid email format |
| `password` | password | Yes | Min 8 characters |
| `confirm_password` | password | Yes | Must match password |

**Submission:** Calls Supabase `signUp`. On success → redirect to email verification prompt.

---

## CompanyProfileForm

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | text | Yes | Min 2, Max 100 |
| `address` | textarea | Yes | Max 300 |
| `contact_number` | tel | No | Valid phone format |
| `signatory_name` | text | No | Max 100 |
| `signatory_title` | text | No | Max 100 |
| `logo_url` | hidden | No | Set by Cloudinary upload |

**Submission:** Calls `PUT /api/companies/me`. On success → toast + query invalidation.

---

## InvoiceForm

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `invoice_number` | text | Yes | Unique per company |
| `status` | select | Yes | DRAFT \| PUBLISHED |
| `due_date` | date | Yes | Must be future date |
| `client_name` | text | Yes | Min 2, Max 100 |
| `client_address` | textarea | No | Max 300 |
| `line_items` | array | Yes | Min 1 line item |
| `line_items[].description` | text | Yes | Max 200 |
| `line_items[].quantity` | number | Yes | > 0 |
| `line_items[].unit_price` | number | Yes | >= 0 |
| `notes` | textarea | No | Max 1000 |

**Submission:** Calls `POST /api/invoices` (create) or `PUT /api/invoices/:id` (edit).

---

## AccountForm

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `display_name` | text | Yes | Min 2, Max 100 |
| `avatar_url` | hidden | No | Set by Cloudinary upload |

---

## ChangePasswordForm

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `current_password` | password | Yes | — |
| `new_password` | password | Yes | Min 8 characters |
| `confirm_password` | password | Yes | Must match new_password |
