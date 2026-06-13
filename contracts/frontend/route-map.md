# Route Map

## Route Groups

| Group | Prefix | Description |
|-------|--------|-------------|
| `(public)` | `/` | Public-facing pages (landing, etc.) |
| `(auth)` | `/auth` | Authentication pages |
| `(dashboard)` | `/dashboard` | Protected dashboard area |

---

## Route Definitions

### Public

| Route | Page Component | Auth Required |
|-------|---------------|---------------|
| `/` | `HomePage` | No |

### Auth

| Route | Page Component | Auth Required |
|-------|---------------|---------------|
| `/auth/login` | `LoginPage` | No (redirect if authed) |
| `/auth/register` | `RegisterPage` | No (redirect if authed) |
| `/auth/reset-password` | `ResetPasswordPage` | No |
| `/auth/verify` | `VerifyEmailPage` | No |

### Dashboard

| Route | Page Component | Auth Required |
|-------|---------------|---------------|
| `/dashboard` | `DashboardPage` | Yes |
| `/dashboard/invoices` | `InvoiceListPage` | Yes |
| `/dashboard/invoices/new` | `InvoiceCreatePage` | Yes |
| `/dashboard/invoices/[id]` | `InvoiceDetailPage` | Yes |
| `/dashboard/invoices/[id]/edit` | `InvoiceEditPage` | Yes |
| `/dashboard/company` | `CompanyProfilePage` | Yes |
| `/dashboard/account` | `AccountPage` | Yes |

---

## Middleware

- All `/dashboard/*` routes are protected by middleware that validates the Supabase session.
- Unauthenticated users are redirected to `/auth/login`.
- Authenticated users accessing `/auth/*` are redirected to `/dashboard`.
