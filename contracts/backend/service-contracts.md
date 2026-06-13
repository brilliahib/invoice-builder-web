# Service Contracts

## Services Overview

Services live in `src/server/domain/services/` and encapsulate domain logic that spans multiple entities or requires external adapters.

---

## `InvoiceNumberService`

**Purpose:** Generates and validates unique invoice numbers per company.

| Method | Input | Output | Description |
|--------|-------|--------|-------------|
| `generateNext(company_id)` | `string` | `string` | Auto-generates next invoice number |
| `validate(company_id, number)` | `string, string` | `boolean` | Checks uniqueness |

---

## `InvoicePdfService`

**Purpose:** Generates PDF output from invoice + company data.

| Method | Input | Output | Description |
|--------|-------|--------|-------------|
| `generate(invoice, company)` | `Invoice, Company` | `Buffer` | Returns PDF bytes |

**Dependencies:** PDF library (e.g., `@react-pdf/renderer` or `puppeteer`). Final choice TBD in decisions.md.

---

## `CloudinaryUploadService`

**Purpose:** Wraps Cloudinary upload for company logos and avatars.

| Method | Input | Output | Description |
|--------|-------|--------|-------------|
| `uploadImage(file, folder)` | `File, string` | `{ url, public_id }` | Uploads and returns Cloudinary URL |
| `deleteImage(public_id)` | `string` | `void` | Deletes an asset |

---

## `AuthService`

**Purpose:** Wraps Supabase Auth for server-side session validation.

| Method | Input | Output | Description |
|--------|-------|--------|-------------|
| `getServerSession()` | — | `Session \| null` | Returns current session from cookies |
| `getUserId()` | — | `string \| null` | Returns current user ID |
