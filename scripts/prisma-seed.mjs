#!/usr/bin/env node
/**
 * prisma-seed.mjs
 *
 * Wrapper script to run the Prisma TypeScript seed via tsx.
 * Run: node scripts/prisma-seed.mjs
 *
 * Prerequisites:
 *   - DATABASE_URL and DIRECT_URL must be set in .env.local
 *   - DEV_SEED_USER_ID must be set (the Supabase auth user ID for the dev account)
 *   - tsx must be available: npm install -D tsx
 */

import { execSync } from 'child_process';
import { resolve } from 'path';

const ROOT = resolve(process.cwd());

console.log('\n🌱 Running Prisma seed via tsx...\n');

try {
  execSync(`npx tsx ${resolve(ROOT, 'prisma/seed.ts')}`, {
    stdio: 'inherit',
    env: {
      ...process.env,
    },
  });
  console.log('\n✅ Seed completed successfully.\n');
} catch (err) {
  console.error('\n❌ Seed failed. Check the error output above.\n');
  process.exit(1);
}
