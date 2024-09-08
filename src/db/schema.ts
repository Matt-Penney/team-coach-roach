import { integer, pgSchema, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

const authSchema = pgSchema('auth')
export const users = authSchema.table('users', {
  id: uuid('id').primaryKey()
})

export const account = pgTable('account', {
  id: uuid('id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  updated_at: timestamp('updated_at'),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  age: integer('age'),
  mobilePhoneNumber: text('mobilePhoneNumber')
})

export type CreateAccount = typeof account.$inferInsert
export type SelectAccount = typeof account.$inferSelect
