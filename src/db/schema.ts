import { sql } from 'drizzle-orm'
import { boolean, date, decimal, integer, pgEnum, pgSchema, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core'

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

export const checkin = pgTable('checkin', {
  checkin_id: serial('checkin_id').primaryKey(),
  account_id: integer('account_id').references(() => account.account_id).notNull(),
  created_at: date('created_at', { mode: 'string' }).defaultNow(),
  updated_at: timestamp('updated_at'),
  weight: decimal('weight').notNull(),
  hasHitCardioTargets: boolean('hasHitCardioTargets'),
  hasHitNutritionalTargets: boolean('hasHitNutritionalTargets'),
  injuriesOrDiscomfort: text('injuriesOrDiscomfort'),
  sleepRating: text('sleepRating'),
  nutritionRating: text('nutritionRating'),
  stressRating: text ('stressRating'),
  notes: text('notes'),
  images: text('images').array().notNull(),
  reviewed: boolean('reviewed').default(false).notNull()
})

export type CreateCheckin = typeof checkin.$inferInsert
export type SelectCheckin = typeof checkin.$inferSelect
