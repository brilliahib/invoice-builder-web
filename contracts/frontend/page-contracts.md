# Page Contracts

## Contract Format

Each page contract defines:
- **Route**: the URL path
- **Purpose**: what the page accomplishes
- **Components used**: key organisms and templates
- **Data**: what server state is required
- **Auth**: authentication requirement
- **Redirect logic**: conditional navigation

---

## DashboardPage (`/dashboard`)

| Field | Value |
|-------|-------|
| Route | `/dashboard` |
| Auth | Required |
| Template | `DashboardLayout` |

**Data required:**
- `useInvoiceSummary()` — summary stats (total, draft, published, monthly)
- `useRecentInvoices()` — last 5 invoices for the company

**Redirect logic:**
- If user has no company → redirect to `/dashboard/company`

---

## InvoiceListPage (`/dashboard/invoices`)

| Field | Value |
|-------|-------|
| Route | `/dashboard/invoices` |
| Auth | Required |
| Template | `DashboardLayout` |

**Data required:**
- `useInvoiceList({ page, status })` — paginated, company-scoped invoice list

**UI states:**
- Loading skeleton
- Empty state with CTA
- Error state

---

## InvoiceDetailPage (`/dashboard/invoices/[id]`)

**Data required:**
- `useInvoice(id)` — single invoice by ID

**Actions:**
- Edit → navigate to edit page
- Export PDF → trigger PDF download
- Delete → confirm dialog → delete mutation

---

## CompanyProfilePage (`/dashboard/company`)

**Data required:**
- `useCurrentCompany()` — company profile

**Actions:**
- Update company form → `useUpdateCompany()` mutation
- Upload logo → Cloudinary upload → update logo_url

---

## AccountPage (`/dashboard/account`)

**Data required:**
- `useCurrentAccount()` — user account profile

**Actions:**
- Update name / avatar → `useUpdateAccount()` mutation
- Change password → `useChangePassword()` mutation
