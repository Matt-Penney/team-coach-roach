import { serverSupabaseClient } from '#supabase/server'
import { Account } from '~~/utils/account'

export default eventHandler(async (event): Promise<Account> => {
  const client = await serverSupabaseClient(event)
  const userId = getRouterParam(event, 'userId')

  const { data, error } = await client.from('account').select('*').eq('id', userId!).single() // TO DO for each 'data' map to Account type
  if (error) throw error

  return new Account(
    data.account_id,
    data.age,
    data.avatarUrl,
    data.email,
    data.id,
    data.memberType,
    data.mobilePhoneNumber,
    data.name,
    data.updated_at,
    data.username,
    data.userStatus
  )
})
