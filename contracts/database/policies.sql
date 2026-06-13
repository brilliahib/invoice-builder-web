-- ============================================================
-- Supabase Row Level Security Policies
-- Apply after Prisma schema migrations
-- ============================================================

-- NOTE: These policies assume auth.uid() returns the Supabase user ID.
-- All tables must have RLS enabled in Supabase.

-- ── Company ──────────────────────────────────────────────────
ALTER TABLE "Company" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own company"
  ON "Company"
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own company"
  ON "Company"
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own company"
  ON "Company"
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ── Invoice ───────────────────────────────────────────────────
ALTER TABLE "Invoice" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their company invoices"
  ON "Invoice"
  FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM "Company" WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert invoices for their company"
  ON "Invoice"
  FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT id FROM "Company" WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their company invoices"
  ON "Invoice"
  FOR UPDATE
  USING (
    company_id IN (
      SELECT id FROM "Company" WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their company invoices"
  ON "Invoice"
  FOR DELETE
  USING (
    company_id IN (
      SELECT id FROM "Company" WHERE user_id = auth.uid()
    )
  );

-- ── LineItem ──────────────────────────────────────────────────
ALTER TABLE "LineItem" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read line items of their invoices"
  ON "LineItem"
  FOR SELECT
  USING (
    invoice_id IN (
      SELECT id FROM "Invoice"
      WHERE company_id IN (
        SELECT id FROM "Company" WHERE user_id = auth.uid()
      )
    )
  );

-- ── Account ───────────────────────────────────────────────────
ALTER TABLE "Account" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own account"
  ON "Account"
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own account"
  ON "Account"
  FOR UPDATE
  USING (user_id = auth.uid());
