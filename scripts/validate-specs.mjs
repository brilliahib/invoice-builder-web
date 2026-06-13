#!/usr/bin/env node
/**
 * validate-specs.mjs
 *
 * Validates that every spec folder contains all required template files.
 * Run: node scripts/validate-specs.mjs
 *
 * Exit code 0 = all specs valid
 * Exit code 1 = missing files found
 */

import { readdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(process.cwd());
const SPECS_DIR = join(ROOT, 'specs');

const REQUIRED_FILES = [
  'spec.md',
  'scope.md',
  'acceptance-criteria.md',
  'edge-cases.md',
  'user-flows.md',
  'decisions.md',
  'api-contract.md',
  'frontend-contract.md',
  'backend-contract.md',
  'database-contract.md',
  'changelog.md',
];

let hasErrors = false;

const specFolders = readdirSync(SPECS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

console.log(`\n📋 Validating specs in: ${SPECS_DIR}`);
console.log(`   Found ${specFolders.length} spec folder(s)\n`);

for (const folder of specFolders) {
  const folderPath = join(SPECS_DIR, folder);
  const missingFiles = REQUIRED_FILES.filter(
    (file) => !existsSync(join(folderPath, file))
  );

  if (missingFiles.length === 0) {
    console.log(`✅ ${folder} — all files present`);
  } else {
    hasErrors = true;
    console.log(`❌ ${folder} — missing files:`);
    missingFiles.forEach((f) => console.log(`     - ${f}`));
  }
}

console.log('');

if (hasErrors) {
  console.error('❌ Spec validation FAILED. Please add missing files.\n');
  process.exit(1);
} else {
  console.log('✅ All specs are valid.\n');
  process.exit(0);
}
