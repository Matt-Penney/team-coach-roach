import { integer, pgSchema, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core'

const authSchema = pgSchema('auth')
export const users = authSchema.table('users', {
  id: uuid('id').primaryKey()
})

export const account = pgTable('account', {
  id: uuid('id').primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'),
  role: text('role').$type<'admin' | 'client'>(),
  age: integer('age'),
  mobilePhoneNumber: integer('mobilePhoneNumber').unique()
})

export const checkin = pgTable('checkin', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull()
    .$onUpdate(() => new Date()),
  accountId: uuid('account_id').notNull()
    .references(() => account.id, { onDelete: 'cascade' }),
  contentFilePath: text('contentFilePath')
})

export type CreateAccount = typeof account.$inferInsert
export type SelectAccount = typeof account.$inferSelect

export type CreateCheckin = typeof checkin.$inferInsert
export type SelectCheckin = typeof checkin.$inferSelect
