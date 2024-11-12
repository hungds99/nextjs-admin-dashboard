import { InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  json,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const userTable = pgTable('User', {
  id: uuid('id').defaultRandom().primaryKey(),
  uid: varchar('uid', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  website: varchar('website', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }),
  companyId: uuid('company_id').references(() => companyTable.id),
  address: varchar('address', { length: 255 }),
  avatar: varchar('avatar', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
export type User = InferSelectModel<typeof userTable>;
export const selectUserSchema = createSelectSchema(userTable);

export const companyTable = pgTable('Company', {
  id: uuid('id').defaultRandom().primaryKey(),
  emailDomain: varchar('email_domain', { length: 255 }).notNull().unique(),
  website: varchar('website', { length: 100 }),
  name: varchar('name', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  address: varchar('address', { length: 255 }),
  country: varchar('country', { length: 255 }),
  overview: text('overview'),
  matchingCriteria: text('matching_criteria'),
  originLogoUrl: varchar('origin_logo_url', { length: 255 }),
  logoPath: varchar('logo_path', { length: 255 }),
  potentialType: smallint('potential_type').default(1),
  facebookUrl: varchar('facebook_url', { length: 255 }),
  linkedinUrl: varchar('linkedin_url', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type Company = InferSelectModel<typeof companyTable>;
export const selectCompanySchema = createSelectSchema(companyTable);

export const chatTable = pgTable('Chat', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  title: text('title').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
export type Chat = InferSelectModel<typeof chatTable>;

export const messageTable = pgTable('Message', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  chatId: uuid('chat_id')
    .notNull()
    .references(() => chatTable.id),
  role: varchar('role').notNull(),
  content: json('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
export type Message = InferSelectModel<typeof messageTable>;

export const voteTable = pgTable(
  'Vote',
  {
    chatId: uuid('chat_id')
      .notNull()
      .references(() => chatTable.id),
    messageId: uuid('message_id')
      .notNull()
      .references(() => messageTable.id),
    isUpvoted: boolean('isUpvoted').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    };
  },
);
export type Vote = InferSelectModel<typeof voteTable>;
