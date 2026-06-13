# Architecture Overview

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15+ App Router |
| Backend | Next.js Route Handlers + Server Components |
| ORM | Prisma |
| Auth | Supabase Auth |
| Database | PostgreSQL (via Supabase) |
| Asset Storage | Cloudinary |
| Server State | React Query (TanStack Query v5) |
| UI System | shadcn/ui + Tailwind CSS |
| Deployment | Vercel (Git integration) |

---

## Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Browser (React)                                            │
│  Pages → Templates → Organisms → Molecules → Atoms         │
│  React Query (useQuery / useMutation)                       │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP
┌─────────────────────▼───────────────────────────────────────┐
│  Next.js Route Handlers (/api/*)                            │
│  Server Components (data pre-fetch)                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│  Application Layer (src/server/application/)                │
│  Use Cases → DTOs → Mappers                                 │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│  Domain Layer (src/server/domain/)                          │
│  Entities → Value Objects → Repository Interfaces           │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│  Infrastructure Layer (src/server/infrastructure/)          │
│  Prisma → Supabase → Cloudinary → PDF                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

1. User action in browser triggers React Query mutation or query
2. React Query calls a Next.js Route Handler (`/api/...`)
3. Route Handler validates the request and calls the appropriate Use Case
4. Use Case enforces business rules and calls Repository (via port interface)
5. Repository implementation (Prisma) executes the database query
6. Data flows back up through mappers → DTOs → HTTP response → React Query cache

---

## Auth Flow

1. Supabase client handles login/register in the browser
2. Supabase sets a session cookie (`sb-*`)
3. Server Components / Route Handlers read the cookie via `@supabase/ssr`
4. Middleware validates the session on every protected route
5. If no valid session → redirect to `/auth/login`

---

## Key Architectural Decisions

- **No business logic in components**: All rules live in Use Cases and domain services
- **Company isolation**: Every query and mutation validates `company_id` against the user's company
- **React Query everywhere**: No ad-hoc `fetch()` calls in components — always via React Query
- **Prisma as source of truth**: Schema changes go through Prisma migrations only
