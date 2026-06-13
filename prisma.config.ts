import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

/**
 * Prisma 7 config file.
 *
 * In Prisma 7, the database connection URL is no longer declared in
 * schema.prisma. It must live here instead.
 *
 * Docs: https://www.prisma.io/docs/orm/reference/prisma-config-reference
 */
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
