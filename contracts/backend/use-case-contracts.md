# Use Case Contracts

## Contract Format

Each use case is defined with:
- **Name** (PascalCase)
- **Actor**
- **Input DTO**
- **Output**
- **Business rules**
- **Error cases**

---

## Auth

### `LoginUseCase`
- **Actor:** Unauthenticated user
- **Input:** `{ email: string; password: string }`
- **Output:** `{ session: Session }`
- **Business rules:** Delegates to Supabase Auth
- **Errors:** `INVALID_CREDENTIALS`, `USER_NOT_VERIFIED`

### `RegisterUseCase`
- **Actor:** Unauthenticated user
- **Input:** `{ email: string; password: string }`
- **Output:** `{ user: User }`
- **Business rules:** Triggers email verification
- **Errors:** `EMAIL_ALREADY_EXISTS`

---

## Company

### `GetCurrentCompanyUseCase`
- **Actor:** Authenticated user
- **Input:** `{ user_id: string }`
- **Output:** `Company | null`
- **Business rules:** Returns company linked to user
- **Errors:** `COMPANY_NOT_FOUND`

### `UpdateCompanyProfileUseCase`
- **Actor:** Authenticated user
- **Input:** `{ user_id: string; data: CompanyUpdateInput }`
- **Output:** `Company`
- **Business rules:** Validates ownership. Saves to DB.
- **Errors:** `COMPANY_NOT_FOUND`, `VALIDATION_ERROR`

---

## Invoice

### `CreateInvoiceUseCase`
- **Actor:** Authenticated user
- **Input:** `{ company_id: string; data: InvoiceCreateInput }`
- **Output:** `Invoice`
- **Business rules:** Validates company ownership. Generates invoice number if not provided.
- **Errors:** `DUPLICATE_INVOICE_NUMBER`, `VALIDATION_ERROR`

### `GetInvoiceListUseCase`
- **Actor:** Authenticated user
- **Input:** `{ company_id: string; page: number; status?: InvoiceStatus }`
- **Output:** `PaginatedResult<InvoiceListItem>`
- **Business rules:** Always filters by `company_id`
- **Errors:** none

### `GetInvoiceDetailUseCase`
- **Actor:** Authenticated user
- **Input:** `{ company_id: string; invoice_id: string }`
- **Output:** `Invoice`
- **Business rules:** Validates `company_id` matches invoice's company
- **Errors:** `INVOICE_NOT_FOUND`, `FORBIDDEN`

### `UpdateInvoiceUseCase`
- **Actor:** Authenticated user
- **Input:** `{ company_id: string; invoice_id: string; data: InvoiceUpdateInput }`
- **Output:** `Invoice`
- **Business rules:** Published invoices cannot be edited
- **Errors:** `INVOICE_NOT_FOUND`, `FORBIDDEN`, `INVOICE_LOCKED`

### `DeleteInvoiceUseCase`
- **Actor:** Authenticated user
- **Input:** `{ company_id: string; invoice_id: string }`
- **Output:** `void`
- **Business rules:** Validates ownership
- **Errors:** `INVOICE_NOT_FOUND`, `FORBIDDEN`

### `ExportInvoicePdfUseCase`
- **Actor:** Authenticated user
- **Input:** `{ company_id: string; invoice_id: string }`
- **Output:** `Buffer` (PDF bytes)
- **Business rules:** Renders invoice with company header
- **Errors:** `INVOICE_NOT_FOUND`, `FORBIDDEN`

---

## Account

### `GetCurrentAccountUseCase`
- **Actor:** Authenticated user
- **Input:** `{ user_id: string }`
- **Output:** `Account`

### `UpdateAccountUseCase`
- **Actor:** Authenticated user
- **Input:** `{ user_id: string; data: AccountUpdateInput }`
- **Output:** `Account`

### `ChangePasswordUseCase`
- **Actor:** Authenticated user
- **Input:** `{ user_id: string; current_password: string; new_password: string }`
- **Output:** `void`
- **Errors:** `WRONG_PASSWORD`

---

## Dashboard

### `GetDashboardSummaryUseCase`
- **Actor:** Authenticated user
- **Input:** `{ company_id: string }`
- **Output:** `InvoiceSummary { total, draft, published, this_month_total }`
- **Business rules:** Always scoped by `company_id`

### `GetRecentInvoicesUseCase`
- **Actor:** Authenticated user
- **Input:** `{ company_id: string; limit: number }`
- **Output:** `InvoiceListItem[]`
- **Business rules:** Always scoped by `company_id`, ordered by `created_at DESC`
