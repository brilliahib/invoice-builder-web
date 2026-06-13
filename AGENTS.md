# AGENTS.md

## 1. Overview

This repository is an invoice application built with **Next.js (full stack)** and the following core technologies:

- **Next.js** for frontend and backend route handling
- **Prisma** as the ORM and primary database access layer
- **Supabase** for authentication and supporting infrastructure/services as needed
- **Cloudinary** for media storage and delivery, such as company logos, avatars, and supporting attachments
- **React Query** for data fetching, caching, server-state synchronization, and mutation handling
- **shadcn/ui** as the base UI component system
- **Atomic Design** as the frontend component structure standard

### Product Goal

This application is used to create and manage invoices per company, with the following core business rules:

1. **One user is linked to one company only**.
2. A user can only view, create, update, and delete invoices belonging to their own company.
3. The dashboard **must not show all invoices**, only invoices created by the user/company currently in scope.
4. Company data is used as the invoice identity source, including logo, address, company name, and signature.

### Core Principles

- **Spec first**: every change must start from a specification.
- **Contract first**: API, database, and UI behavior must be clear before implementation.
- **Clean architecture**: business logic must not be mixed with UI.
- **Single company scope**: every query and action must be isolated to the user's company.
- **Reusable UI**: use Atomic Design and shadcn/ui consistently.
- **React Query is mandatory for server state**: all fetching and mutations must go through React Query unless a documented technical exception exists.

---

## 2. Core Business Rules

### 2.1 User and Company Relationship

- One user can only own or belong to **one company**.
- A user must not freely switch to another company unless the product explicitly defines a super-admin or multi-company feature.
- Every invoice record must always have a clear `company_id` scope.

### 2.2 Data Scope

- A user may only access data belonging to their own company.
- All invoice lists, invoice details, invoice edits, invoice deletions, and PDF generation must be validated against the user's company.
- The dashboard must only show invoices created by the user/company in scope.
- Cross-company access is not allowed unless explicitly defined in the specification.

### 2.3 Invoice

- An invoice is private to its company.
- An invoice must support create, draft, publish, update, and PDF export.
- Invoice data must remain consistent with company data as the source of the document header and identity.

### 2.4 Company Management

- Company is the primary source for:
  - company name
  - address
  - logo
  - contact number
  - signatory name
  - signatory title
- Any company data changes must immediately affect new invoices and PDF headers.

---

## 3. Tech Stack Rules

### 3.1 Next.js

- Use the latest Next.js version available at the time implementation starts.
- Use the App Router.
- Use Server Components where appropriate.
- Use Client Components only when browser interaction is truly needed.
- Use Route Handlers for lightweight backend endpoints when necessary.
- Avoid placing large business logic inside pages or route handlers.

### 3.2 Prisma

- Prisma is the main database access layer for application data.
- The Prisma schema must be the canonical representation of the application data model.
- Migrations must be controlled and documented.
- Do not write raw SQL when Prisma can handle the case safely and clearly.

### 3.3 Supabase

- Supabase is used for authentication and/or supporting services as needed by the implementation.
- All Supabase usage must be wrapped inside clear adapters or services.
- Do not spread Supabase logic across many components.

### 3.4 Cloudinary

- Cloudinary is used for asset upload and delivery.
- Common assets include:
  - company logos
  - profile pictures
  - invoice attachments if needed
- Upload and image transformation logic must be centralized in a dedicated service/adapter.

### 3.5 React Query

- **Mandatory** for all server state.
- All data fetching for invoice, company, account, and dashboard must use React Query.
- All create/update/delete actions must use React Query mutations.
- Use standardized and consistent query keys.
- Do not fetch data directly inside components using fetch/axios without React Query unless there is a documented reason.

### 3.6 shadcn/ui

- Use shadcn/ui for base components such as button, dialog, dropdown, form, table, input, card, tabs, toast, and sheet.
- Do not build base components from scratch when shadcn/ui already provides a suitable one.
- Custom components may be built on top of shadcn/ui, but they must preserve consistency.

### 3.7 Atomic Design

The frontend structure must follow Atomic Design:

- **Atoms**: smallest components, e.g. button, input, badge, icon wrapper
- **Molecules**: combinations of atoms, e.g. search bar, invoice row, company info card
- **Organisms**: larger UI blocks, e.g. invoice table, sidebar, invoice form section
- **Templates**: page layout structures, e.g. dashboard layout, invoice detail layout
- **Pages**: final pages assembled from templates and organisms

---

## 4. Main Folder Structure

The repository structure must support spec-driven development and clean architecture.

```txt
project-root/
├─ AGENTS.md
├─ README.md
├─ CHANGELOG.md
├─ .env.example
├─ package.json
├─ next.config.ts
├─ tsconfig.json
├─ eslint.config.mjs
├─ prettier.config.mjs
├─ tailwind.config.ts
├─ postcss.config.mjs
├─ .github/
│  └─ workflows/
│     ├─ ci.yml
│     └─ supabase-keepalive.yml
├─ specs/
│  ├─ 0001-auth/
│  ├─ 0002-company-management/
│  ├─ 0003-invoice-management/
│  ├─ 0004-account-management/
│  └─ 0005-dashboard-scope/
├─ contracts/
│  ├─ api/
│  ├─ frontend/
│  ├─ backend/
│  └─ database/
├─ docs/
│  ├─ architecture/
│  ├─ product/
│  └─ implementation/
├─ prisma/
│  ├─ schema.prisma
│  ├─ migrations/
│  └─ seed.ts
├─ supabase/
│  ├─ config.toml
│  ├─ migrations/
│  ├─ functions/
│  └─ seed.sql
├─ src/
│  ├─ app/
│  ├─ components/
│  ├─ features/
│  ├─ server/
│  ├─ lib/
│  └─ types/
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  ├─ contract/
│  └─ e2e/
└─ scripts/
   ├─ validate-specs.mjs
   ├─ sync-contracts.mjs
   ├─ prisma-seed.mjs
   └─ supabase-keepalive.mjs
```

### Deployment Rule

- **Deployment must be handled by Vercel**, using the repository connected to Vercel through Git integration.
- Do **not** use GitHub Actions as the deployment mechanism.
- GitHub Actions may be used for CI checks, validation, synchronization helpers, or keep-alive jobs only.

---

## 5. Spec-Driven Development Folder Explanation

### 5.1 `specs/`

This is the central workspace for the whole process. Every new feature and every important change must start here.

#### Example feature folder

```txt
specs/0003-invoice-management/
├─ spec.md
├─ scope.md
├─ acceptance-criteria.md
├─ edge-cases.md
├─ user-flows.md
├─ decisions.md
├─ api-contract.md
├─ frontend-contract.md
├─ backend-contract.md
├─ database-contract.md
└─ changelog.md
```

#### What each file means

- **spec.md**: the main feature document, explaining the problem, goal, and high-level requirements.
- **scope.md**: feature boundaries, including what is included and excluded.
- **acceptance-criteria.md**: the conditions for considering the feature complete.
- **edge-cases.md**: unusual or boundary cases.
- **user-flows.md**: user journey from start to finish.
- **decisions.md**: technical or product decisions that must be recorded.
- **api-contract.md**: endpoint contracts related to the feature.
- **frontend-contract.md**: UI behavior, state, and component interaction.
- **backend-contract.md**: use cases, services, input/output, and domain rules.
- **database-contract.md**: tables, relationships, indexes, constraints, and migration impact.
- **changelog.md**: a summary of changes for that feature.

### 5.2 `contracts/`

This folder stores contracts that should be stable before implementation.

#### `contracts/api/`

Contains API definitions, ideally in OpenAPI or another structured format.
Example files:

- `auth.openapi.yaml`
- `companies.openapi.yaml`
- `invoices.openapi.yaml`
- `accounts.openapi.yaml`

#### `contracts/frontend/`

Contains UI and interaction contracts.
Example files:

- `route-map.md`
- `page-contracts.md`
- `component-contracts.md`
- `form-contracts.md`

#### `contracts/backend/`

Contains backend logic contracts.
Example files:

- `use-case-contracts.md`
- `service-contracts.md`
- `dto-contracts.md`
- `error-contracts.md`

#### `contracts/database/`

Contains database contracts that serve as the implementation foundation.
Example files:

- `schema.sql` or `schema.prisma`
- `migrations/`
- `policies.sql`
- `triggers.sql`
- `seed.sql`
- `erd.md`

### 5.3 `docs/`

Documentation folder for architectural decisions and implementation guidance.

#### `docs/architecture/`

- `overview.md`
- `dependency-rules.md`
- `boundaries.md`
- `error-handling.md`

#### `docs/product/`

- `prd.md`
- `glossary.md`

#### `docs/implementation/`

- `invoice-pdf-flow.md`
- `auth-flow.md`
- `company-header-flow.md`

---

## 6. Required Source Code Structure

### 6.1 `src/app/`

Contains the Next.js App Router.
Use route groups to separate public, auth, and dashboard areas.

Example:

- `(public)` for public pages
- `(auth)` for login/register/reset pages
- `(dashboard)` for the authenticated area

### 6.2 `src/components/`

Contains shared UI components based on Atomic Design.

Example structure:

```txt
src/components/
├─ atoms/
├─ molecules/
├─ organisms/
├─ templates/
└─ ui/
```

#### Atomic Design rules

- **atoms**: small reusable components
- **molecules**: combinations of atoms
- **organisms**: complex UI sections
- **templates**: page layout structures
- **ui**: standardized shadcn/ui wrappers or re-exports

### 6.3 `src/features/`

Contains feature-specific logic by domain.

Example:

- `auth/`
- `company/`
- `invoice/`
- `account/`

Each feature may contain:

- `components/`
- `hooks/`
- `schemas/`
- `queries/`
- `mutations/`
- `actions.ts`

### 6.4 `src/server/`

Contains the backend layer under clean architecture.

Example structure:

```txt
src/server/
├─ domain/
│  ├─ entities/
│  ├─ value-objects/
│  ├─ repositories/
│  └─ services/
├─ application/
│  ├─ use-cases/
│  ├─ dto/
│  ├─ ports/
│  └─ mappers/
├─ infrastructure/
│  ├─ prisma/
│  ├─ supabase/
│  ├─ cloudinary/
│  ├─ pdf/
│  └─ auth/
└─ shared/
   ├─ errors/
   ├─ utils/
   ├─ constants/
   └─ types/
```

#### Dependency rules

- `domain` must not depend on other layers.
- `application` may depend on `domain`.
- `infrastructure` implements ports/repositories.
- `app` and `features` may only call use cases or prepared hooks.

### 6.5 `src/lib/`

Contains technical helpers that do not belong in the domain layer.
Examples:

- `supabase/client.ts`
- `supabase/server.ts`
- `cloudinary/client.ts`
- `pdf/generate-invoice-pdf.ts`
- `formatters/`
- `validators/`

### 6.6 `prisma/`

All Prisma schema and migration files live here.

Examples:

- `schema.prisma`
- `migrations/`
- `seed.ts`

### 6.7 `supabase/`

Still used for Supabase needs such as migration, function, and seed assets.
Even though Prisma is the main ORM, this folder remains important for Supabase-specific artifacts.

### 6.8 `.github/workflows/`

All automation must be clearly separated.
Examples:

- `ci.yml` for lint, test, build
- `supabase-keepalive.yml` for scheduled keep-alive / activity checks

---

## 7. Working Rules for AI Agents

### 7.1 Do not code before the spec exists

AI must read `specs/` and `contracts/` first before creating or changing code.

### 7.2 Every change must leave a trace

Every feature change must update:

- spec
- contract
- changelog
- test

### 7.3 Never violate company scope

All invoice queries must be filtered by the logged-in user’s company.

No endpoint or UI may leak invoices across companies.

### 7.4 Naming must be consistent

Use consistent naming for:

- folders
- files
- query keys
- route names
- DTOs
- use cases
- component names

### 7.5 Do not mix layers

- UI must not contain complex business rules.
- Use cases must not depend directly on UI.
- Database logic must not be embedded in components.

### 7.6 React Query is the standard for server state

All server data must use React Query.

Policy examples:

- Invoice list → `useQuery`
- Invoice detail → `useQuery`
- Create invoice → `useMutation`
- Update company profile → `useMutation`
- Delete account/invoice → `useMutation`

---

## 8. Naming Conventions

### 8.1 Spec

- `0001-auth`
- `0002-company-management`
- `0003-invoice-management`

### 8.2 Component

- `InvoiceTable`
- `CompanyHeaderCard`
- `InvoiceCreateForm`

### 8.3 Hook

- `useInvoiceList`
- `useCreateInvoice`
- `useCurrentCompany`

### 8.4 Use Case

- `CreateInvoiceUseCase`
- `UpdateCompanyProfileUseCase`
- `GetDashboardInvoiceListUseCase`

### 8.5 Repository

- `InvoiceRepository`
- `CompanyRepository`
- `AccountRepository`

---

## 9. Definition of Done

A task is considered complete when:

- the spec has been written and matches the scope
- the contract has been created or updated
- implementation follows clean architecture
- the UI follows Atomic Design and shadcn/ui
- data fetching uses React Query
- queries are scoped to the user's company
- tests have been added or updated
- the changelog has been updated

---

## 10. Important Note for the Dashboard

The dashboard is the most sensitive area in terms of data scope.
Mandatory rules:

- never fetch all invoices from the database
- always filter by `company_id`
- if needed, also filter by `created_by_user_id`
- use indexed queries for performance
- all dashboard summary widgets must use the active company dataset only

---

## 11. Implementation Priority

Recommended implementation order:

1. Auth
2. Company Management
3. Account Management
4. Invoice CRUD
5. Invoice PDF Generation
6. Scoped dashboard data
7. Cloudinary asset handling
8. Observability, audit, and hardening

---

## 12. Final Principle

When in doubt, always follow this order:
**Spec → Contract → Design → Implementation → Test → Changelog**

All features must remain simple, isolated, and safe within the one-user-one-company model.
