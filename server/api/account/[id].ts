import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data, error } = await client.from('account').select('name').eq('id', event)

  if (error) {
    console.log(error)
    return false
  }
  return { account: data } // TO DO doesnt work
})
