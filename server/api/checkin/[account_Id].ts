import { serverSupabaseClient } from '#supabase/server'
import type { Checkin } from '~~/utils/checkin'

export default eventHandler(async (event): Promise<Checkin[]> => {
  const client = await serverSupabaseClient(event)
  const accountId = getRouterParam(event, 'account_Id')

  const { data, error } = await client.from('checkin').select('*')
    .eq('account_id', parseInt(accountId!))
    .returns<Checkin[]>()
    .order('created_at', { ascending: true })
  if (error) throw error

  return data
})
