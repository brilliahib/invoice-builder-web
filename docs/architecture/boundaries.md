# Architectural Boundaries

## Module Boundaries

These boundaries define where each concern starts and stops.

---

## Feature Boundaries

| Feature | Starts at | Ends at |
|---------|-----------|---------|
| Auth | `/auth/*` routes | Supabase session cookie set |
| Company | User has a session | Company CRUD complete |
| Invoice | Company exists | Invoice CRUD + PDF export |
| Account | User has a session | Profile + password management |
| Dashboard | User + Company exist | Summary data displayed |

---

## Responsibility Boundaries

| Responsibility | Owner |
|---------------|-------|
| Session management | Supabase Auth + middleware |
| Company data isolation | Use Cases + Prisma WHERE clauses |
| Asset upload/delivery | Cloudinary adapter |
| PDF generation | InvoicePdfService |
| Server state synchronization | React Query |
| Form validation (client) | Zod schemas in `features/*/schemas/` |
| Business rule validation | Use Cases in `server/application/` |
| Database schema | Prisma schema only |
| Auth policies | Supabase RLS |

---

## What Lives Where

| Concern | Location |
|---------|---------|
| Route protection | `src/middleware.ts` |
| API endpoints | `src/app/api/*/route.ts` |
| Page layouts | `src/components/templates/` |
| Feature-specific hooks | `src/features/*/hooks/` |
| Shared queries/mutations | `src/features/*/queries/`, `src/features/*/mutations/` |
| Use cases | `src/server/application/use-cases/` |
| Domain entities | `src/server/domain/entities/` |
| Prisma queries | `src/server/infrastructure/prisma/` |
