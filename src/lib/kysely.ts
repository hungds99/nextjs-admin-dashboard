import { DB } from '@/types/db';
import { createKysely } from '@vercel/postgres-kysely';

export const db = createKysely<DB>({
  connectionString: process.env.POSTGRES_URL,
});
export { sql } from 'kysely';
