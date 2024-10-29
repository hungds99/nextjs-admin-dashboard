import { DB } from '@/types/db';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5434,
    max: 10,
  }),
});

export const db = new Kysely<DB>({ dialect });
export { sql } from 'kysely';
