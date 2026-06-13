# Component Contracts

## Atomic Design Classification

| Level | Description | Examples |
|-------|-------------|---------|
| Atom | Smallest unit, no children | Badge, Avatar, Spinner, Icon |
| Molecule | Composed of atoms | InvoiceStatusBadge, CompanyLogoUpload |
| Organism | Complex UI block | InvoiceTable, InvoiceForm, CompanyHeaderCard |
| Template | Page layout wrapper | DashboardLayout, AuthLayout |

---

## Atom Contracts

### `StatusBadge`
- **Props:** `status: 'DRAFT' | 'PUBLISHED'`
- **Renders:** A colored badge reflecting invoice status

### `CurrencyDisplay`
- **Props:** `amount: number, currency?: string`
- **Renders:** Formatted currency string

---

## Molecule Contracts

### `InvoiceRow`
- **Props:** `invoice: InvoiceListItem`
- **Renders:** Single row in the invoice list table

### `CompanyLogoUpload`
- **Props:** `currentLogoUrl?: string, onUpload: (url: string) => void`
- **Renders:** Logo preview + upload trigger (Cloudinary)

---

## Organism Contracts

### `InvoiceTable`
- **Props:** `invoices: InvoiceListItem[], isLoading: boolean, onRowClick: (id: string) => void`
- **Renders:** Full paginated invoice list with columns: number, client, status, amount, date

### `InvoiceForm`
- **Props:** `defaultValues?: InvoiceFormValues, onSubmit: (values: InvoiceFormValues) => void, isSubmitting: boolean`
- **Renders:** Full invoice creation/edit form with line items

### `CompanyHeaderCard`
- **Props:** `company: CompanyProfile`
- **Renders:** Company info header card (used in invoice preview)

### `DashboardSummary`
- **Props:** `summary: InvoiceSummary`
- **Renders:** Stats widgets for invoice counts and totals

---

## Template Contracts

### `DashboardLayout`
- **Props:** `children: React.ReactNode`
- **Renders:** Sidebar + topbar + main content area

### `AuthLayout`
- **Props:** `children: React.ReactNode`
- **Renders:** Centered card layout for auth pages
