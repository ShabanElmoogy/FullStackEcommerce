import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod';

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  address: text(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default('user')
});

export const createUserSchema = createInsertSchema(usersTable).omit({ role: true });

export const loginSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true
});