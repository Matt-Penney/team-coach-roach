import { integer, pgEnum, pgSchema, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const memberTypeEnum = pgEnum('memberType', ['client', 'coach', 'admin'])
export const userStatusEnum = pgEnum('userStatus', ['subscribed', 'unsubscribed', 'bounced'])

const authSchema = pgSchema('auth')
export const users = authSchema.table('users', {
  id: uuid('id').primaryKey()
})

export const account = pgTable('account', {
  id: uuid('id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  account_id: serial('account_id').primaryKey(),
  updated_at: timestamp('updated_at'),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  age: integer('age'),
  mobilePhoneNumber: text('mobilePhoneNumber'),
  username: text('username').unique(),
  memberType: memberTypeEnum('memberType'),
  userStatus: userStatusEnum('userStatus').default(userStatusEnum.enumValues[1]).notNull(),
  avatarUrl: text('avatarUrl')
})

export type CreateAccount = typeof account.$inferInsert
export type SelectAccount = typeof account.$inferSelect
