'server-only';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(`${process.env.DATABASE_URL!}?sslmode=require`);
const db = drizzle(client, {
  casing: 'snake_case',
});

export { db };
