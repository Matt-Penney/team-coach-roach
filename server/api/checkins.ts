import { serverSupabaseClient } from '#supabase/server'
import type { Checkin } from '~~/utils/checkin'

export default eventHandler(async (event): Promise<Checkin[]> => {
  // TO DO this might need a middleware check that only the permitted people can come use this, look at nuxt3Auth example uses async functions for only admin roles
  const client = await serverSupabaseClient(event)

  const { data, error } = await client.from('account').select('*')
    .in('memberType', ['client', 'coach'])
    .returns<Checkin[]>()
    .order('name', { ascending: false })

  if (error) throw error

  return data
})
