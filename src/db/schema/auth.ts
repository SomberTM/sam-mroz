import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import { posts, stories } from ".";

const roles = ["USER", "CREATOR", "ADMIN"] as const;
export const roleEnum = pgEnum("role", roles);

export type Role = (typeof roles)[number];

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  role: roleEnum("role").notNull().default("USER"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  stories: many(stories),
  posts: many(posts),
  authorProfile: one(authorProfiles, {
    fields: [users.id],
    references: [authorProfiles.userId],
  }),
}));

export type User = typeof users.$inferSelect;

export const authorProfiles = pgTable("profile", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
});

export type AuthorProfile = typeof authorProfiles.$inferSelect;
export type UserWithProfile = User & { profile?: AuthorProfile };

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export type Account = typeof accounts.$inferSelect;

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export type Session = typeof sessions.$inferSelect;

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export type VerificationToken = typeof verificationTokens.$inferSelect;
