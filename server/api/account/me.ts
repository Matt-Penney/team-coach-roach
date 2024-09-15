import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default eventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data, error } = await client.from('account').select('*').eq('id', user!.id).single()
  if (error) throw error
  return data
})
