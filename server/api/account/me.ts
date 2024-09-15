import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { Account } from '~~/utils/account'

export default eventHandler(async (event): Promise<Account> => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data, error } = await client.from('account').select('*').eq('id', user!.id).single()
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
