/**
 * Prisma Seed Script — Prisma 7
 *
 * Populates the database with development/test seed data.
 * Run with: node scripts/prisma-seed.mjs
 * Or via:   npx prisma db seed
 *
 * NOTE: This file is a scaffold. Implement seed data after
 * the Supabase auth user is created manually or via admin API.
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

  // TODO: Replace with the actual Supabase user ID from your dev project
  const DEV_USER_ID = process.env.DEV_SEED_USER_ID;

  if (!DEV_USER_ID) {
    throw new Error(
      'DEV_SEED_USER_ID environment variable is required for seeding. ' +
      'Set it in .env.local with the Supabase user ID from your dev project.'
    );
  }

  // ── Company ──────────────────────────────────────────────────
  const company = await prisma.company.upsert({
    where: { userId: DEV_USER_ID },
    update: {},
    create: {
      userId: DEV_USER_ID,
      name: 'Acme Corp',
      address: '123 Main St, Jakarta, Indonesia 10110',
      contactNumber: '+62 21 1234 5678',
      signatoryName: 'John Doe',
      signatoryTitle: 'CEO',
    },
  });

  console.log('✅ Company seeded:', company.name);

  // ── Account ───────────────────────────────────────────────────
  await prisma.account.upsert({
    where: { userId: DEV_USER_ID },
    update: {},
    create: {
      userId: DEV_USER_ID,
      displayName: 'Test User',
    },
  });

  console.log('✅ Account seeded');

  // ── Invoices ──────────────────────────────────────────────────
  const invoice1 = await prisma.invoice.upsert({
    where: {
      companyId_invoiceNumber: {
        companyId: company.id,
        invoiceNumber: 'INV-0001',
      },
    },
    update: {},
    create: {
      companyId: company.id,
      invoiceNumber: 'INV-0001',
      status: 'DRAFT',
      clientName: 'PT Sample Client',
      clientAddress: '456 Client Ave, Surabaya, Indonesia',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      notes: 'Thank you for your business.',
      totalAmount: 5000000,
      lineItems: {
        create: [
          {
            description: 'Web Development Services',
            quantity: 10,
            unitPrice: 400000,
            total: 4000000,
            sortOrder: 1,
          },
          {
            description: 'Hosting Setup',
            quantity: 1,
            unitPrice: 1000000,
            total: 1000000,
            sortOrder: 2,
          },
        ],
      },
    },
  });

  console.log('✅ Invoice seeded:', invoice1.invoiceNumber);

  const invoice2 = await prisma.invoice.upsert({
    where: {
      companyId_invoiceNumber: {
        companyId: company.id,
        invoiceNumber: 'INV-0002',
      },
    },
    update: {},
    create: {
      companyId: company.id,
      invoiceNumber: 'INV-0002',
      status: 'PUBLISHED',
      clientName: 'CV Maju Bersama',
      clientAddress: '789 Partner Rd, Bandung, Indonesia',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      totalAmount: 2500000,
      lineItems: {
        create: [
          {
            description: 'UI Design Consultation',
            quantity: 5,
            unitPrice: 500000,
            total: 2500000,
            sortOrder: 1,
          },
        ],
      },
    },
  });

  console.log('✅ Invoice seeded:', invoice2.invoiceNumber);
  console.log('✅ Seed complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
