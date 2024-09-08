import { eq } from 'drizzle-orm'
import { db } from '~~/src/db/index'
import { account } from '~~/src/db/schema'
import type { CreateAccount, SelectAccount } from '~~/src/db/schema.ts'

export async function createAccount(data: CreateAccount) {
  await db.insert(account).values(data)
}

export async function getAccountById(id: SelectAccount['id']): Promise<
  Array<{
    updated_at: Date | null
    name: string
    email: string
    age: number | null
    mobilePhoneNumber: string | null
  }>
> {
  return db.select().from(account).where(eq(account.id, id))
}

export async function updateAccount(id: SelectAccount['id'], data: Partial<Omit<SelectAccount, 'id'>>) {
  await db.update(account).set(data).where(eq(account.id, id))
}

export async function deleteAccount(id: SelectAccount['id']) {
  await db.delete(account).where(eq(account.id, id))
}
