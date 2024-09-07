import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  age: integer('age'),
  mobilePhoneNumber: integer('mobilePhoneNumber').unique()
})

export const checkinTable = pgTable('checkin_Table', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull()
    .$onUpdate(() => new Date()),
  userId: integer('user_id').notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  contentFilePath: text('contentFilePath')
})

export type CreateUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export type CreateCheckin = typeof checkinTable.$inferInsert
export type SelectCheckin = typeof checkinTable.$inferSelect
