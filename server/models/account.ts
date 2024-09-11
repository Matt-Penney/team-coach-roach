import { serverSupabaseClient } from '#supabase/server'
import type { Account } from '~/types'

export async function getAccounts() {
  return accounts
}

export async function getUserByEmail(email: string) {
  return accounts.find(account => account.email === email)
}

export async function getUserById(accountId: number) {
  return accounts.find(account => account.accountId === accountId)
}

export async function isAdmin(user?: User) {
  return user && user.roles.includes('ADMIN')
}

// TO DO idk how to get a const of users
