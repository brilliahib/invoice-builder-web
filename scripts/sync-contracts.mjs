#!/usr/bin/env node
/**
 * sync-contracts.mjs
 *
 * Checks that contract files exist for all known features and reports
 * any missing contract files across api/, frontend/, backend/, database/ layers.
 *
 * Run: node scripts/sync-contracts.mjs
 */

import { existsSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(process.cwd());
const CONTRACTS_DIR = join(ROOT, 'contracts');

const EXPECTED_CONTRACTS = {
  'api/': [
    'auth.openapi.yaml',
    'companies.openapi.yaml',
    'invoices.openapi.yaml',
    'accounts.openapi.yaml',
  ],
  'frontend/': [
    'route-map.md',
    'page-contracts.md',
    'component-contracts.md',
    'form-contracts.md',
  ],
  'backend/': [
    'use-case-contracts.md',
    'service-contracts.md',
    'dto-contracts.md',
    'error-contracts.md',
  ],
  'database/': [
    'erd.md',
    'policies.sql',
    'seed.sql',
  ],
};

let hasErrors = false;

console.log('\n📑 Checking contracts...\n');

for (const [layer, files] of Object.entries(EXPECTED_CONTRACTS)) {
  console.log(`── ${layer}`);
  for (const file of files) {
    const fullPath = join(CONTRACTS_DIR, layer, file);
    if (existsSync(fullPath)) {
      console.log(`   ✅ ${file}`);
    } else {
      console.log(`   ❌ MISSING: ${file}`);
      hasErrors = true;
    }
  }
}

console.log('');

if (hasErrors) {
  console.error('❌ Contract sync check FAILED. Missing contract files detected.\n');
  process.exit(1);
} else {
  console.log('✅ All contracts are present.\n');
  process.exit(0);
}
