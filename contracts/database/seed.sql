-- ============================================================
-- Seed Data Contract
-- Describes the minimum seed data needed for development/testing
-- ============================================================

-- NOTE: This is a contract document, not executable seed SQL.
-- Actual seeds live in prisma/seed.ts and supabase/seed.sql.

-- ── Required Seed Entities ────────────────────────────────────

-- 1. Test user (created via Supabase Auth in seed script)
--    email: test@example.com
--    password: testpassword123

-- 2. Company linked to test user
--    name: "Acme Corp"
--    address: "123 Main St, Jakarta, Indonesia"
--    signatory_name: "John Doe"
--    signatory_title: "CEO"

-- 3. Sample invoices (2-3 per company)
--    - 1 DRAFT invoice with 2 line items
--    - 1 PUBLISHED invoice with 3 line items

-- 4. Account record for test user
--    display_name: "Test User"

-- ── Seed Execution Order ──────────────────────────────────────
-- 1. Create Supabase auth user (supabase-keepalive.mjs or admin API)
-- 2. Run prisma/seed.ts to insert Company, Account, Invoice, LineItem
