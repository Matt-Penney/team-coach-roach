import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { error } = await client.auth.signOut()

  if (error) {
    throw error
  }
  return {
    user: null
  }
})
