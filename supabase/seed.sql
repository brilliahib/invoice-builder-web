-- ============================================================
-- Supabase Seed File
-- Used by `supabase db seed` for local development only.
--
-- NOTE: This seed only handles data that Supabase manages
-- (e.g., auth users, RLS policies). Application data is
-- seeded via prisma/seed.ts.
-- ============================================================

-- Insert a local dev auth user (only works in local Supabase)
-- Password: testpassword123
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test@example.com',
  crypt('testpassword123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"display_name": "Test User"}',
  false,
  'authenticated'
)
ON CONFLICT (id) DO NOTHING;
