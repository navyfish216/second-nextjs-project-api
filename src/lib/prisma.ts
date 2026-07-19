import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line
  var prisma: PrismaClient | undefined;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const isPrismaDebug: boolean = process.env.PRISMA_DEBUG === 'true';

export const prisma = global.prisma || 
(
  isPrismaDebug ? 
  new PrismaClient({ adapter, log: ['query', 'info', 'warn', 'error'] }) : new PrismaClient({ adapter })
);

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export * from "@prisma/client";
