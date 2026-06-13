# Invoice Builder Web

A full-stack invoice management application built with Next.js, Prisma, Supabase, Cloudinary, React Query, and shadcn/ui.

---

## Product Overview

Invoice Builder Web allows companies to create and manage invoices in a fully isolated, per-company scope.

**Core business rules:**
- One user belongs to one company only.
- Users can only view, create, update, and delete invoices within their own company.
- The dashboard shows only the invoices belonging to the currently logged-in company.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| ORM | Prisma |
| Auth & Infra | Supabase |
| Asset Storage | Cloudinary |
| Server State | React Query |
| UI Components | shadcn/ui |
| Styling | Tailwind CSS |
| Deployment | Vercel (Git integration) |

---

## Getting Started

### Prerequisites

- Node.js >= 20
- A Supabase project
- A Cloudinary account
- Vercel project (for deployment)

### Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd invoice-builder-web

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local
# Fill in the values in .env.local

# 4. Push Prisma schema to database
npx prisma db push

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Repository Structure

```
invoice-builder-web/
├─ specs/          # Spec-Driven Development: feature specs and acceptance criteria
├─ contracts/      # API, frontend, backend, and database contracts
├─ docs/           # Architecture, product, and implementation documentation
├─ src/            # Application source code (Next.js App Router + Clean Architecture)
├─ prisma/         # Prisma schema and migrations
├─ supabase/       # Supabase migrations, functions, and seed
├─ tests/          # Unit, integration, contract, and e2e tests
├─ scripts/        # Automation and validation scripts
├─ .env.example    # Environment variable template
├─ AGENTS.md       # AI agent working rules and repository conventions
└─ CHANGELOG.md    # Project changelog
```

See [AGENTS.md](./AGENTS.md) for the full set of working rules and conventions.

---

## Development Workflow

This project follows **Spec-Driven Development**:

1. Write or update a spec in `specs/<feature>/spec.md`
2. Define contracts in `contracts/` (API, frontend, backend, database)
3. Get spec and contract approved before writing any code
4. Implement following Clean Architecture boundaries
5. Use React Query for all server state
6. Write tests in `tests/`
7. Update `CHANGELOG.md`

---

## Deployment

Deployment is handled by **Vercel** via Git integration.
Push to the `main` branch to trigger a production deploy.

Do **not** add deployment logic to GitHub Actions.

---

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the production bundle |
| `npm run lint` | Run ESLint |
| `node scripts/validate-specs.mjs` | Validate that all spec folders are complete |
| `node scripts/sync-contracts.mjs` | Sync contract files across layers |
| `node scripts/prisma-seed.mjs` | Seed the database |
| `node scripts/supabase-keepalive.mjs` | Keep the Supabase project active |
