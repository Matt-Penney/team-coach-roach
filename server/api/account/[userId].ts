import { serverSupabaseClient } from '#supabase/server'
import type { Account } from '~/types'

export default eventHandler(async (event): Promise<Account> => {
  // const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)
  const userId = getRouterParam(event, 'userId')

  const { data, error } = await client.from('account').select('*').eq('id', userId!).single() // TO DO for each 'data' map to Account type
  if (error) throw error
  return data
})
