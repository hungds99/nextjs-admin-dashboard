import type { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Companies {
  address: string | null;
  country: string | null;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  email_domain: string;
  id: Generated<string>;
  logo_path: string | null;
  matching_criteria: string | null;
  name: string | null;
  origin_logo_url: string | null;
  overview: string | null;
  phone: string | null;
  potential_type: Generated<number>;
  updated_at: Generated<Timestamp>;
  website: string | null;
}

export interface CompanyUsers {
  company_id: string | null;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  is_admin: Generated<boolean | null>;
  updated_at: Generated<Timestamp>;
  user_id: string | null;
}

export interface EmailVerifications {
  code: string;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  email: string;
  expired_at: Timestamp;
  is_verify: Generated<boolean | null>;
  uid: string;
  updated_at: Generated<Timestamp>;
}

export interface KnexMigrations {
  batch: number | null;
  id: Generated<number>;
  migration_time: Timestamp | null;
  name: string | null;
}

export interface KnexMigrationsLock {
  index: Generated<number>;
  is_locked: number | null;
}

export interface SwapCards {
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  id: Generated<string>;
  receiver_id: string | null;
  sender_id: string | null;
  status: Generated<number | null>;
  updated_at: Generated<Timestamp>;
}

export interface Users {
  address: string | null;
  company: string | null;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  email: string;
  id: Generated<string>;
  name: string;
  phone: string | null;
  position: string | null;
  uid: string;
  updated_at: Generated<Timestamp>;
  website: string;
}

export interface WeeklyPicks {
  company_id: string | null;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  expired_at: Timestamp;
  updated_at: Generated<Timestamp>;
  user_id: string | null;
}

export interface DB {
  companies: Companies;
  company_users: CompanyUsers;
  email_verifications: EmailVerifications;
  knex_migrations: KnexMigrations;
  knex_migrations_lock: KnexMigrationsLock;
  swap_cards: SwapCards;
  users: Users;
  weekly_picks: WeeklyPicks;
}
