import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * Prisma Client singleton — Prisma 7 pattern.
 *
 * In Prisma 7, the PrismaClient must receive a driver adapter at runtime.
 * The connection URL is no longer read from schema.prisma; it comes from
 * the DATABASE_URL environment variable via the adapter.
 *
 * Docs: https://www.prisma.io/docs/orm/reference/prisma-config-reference
 */

import pg from 'pg';

const createPrismaClient = () => {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

// Prevent multiple PrismaClient instances in development (Next.js hot reload)
declare global {
  // eslint-disable-next-line no-var
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

export const prisma = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
