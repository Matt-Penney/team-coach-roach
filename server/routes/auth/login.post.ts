import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string, password: string }>(event)
  const { email, password } = body

  const client = await serverSupabaseClient(event)
  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password
  })

  if (error) {
    throw error
  }

  return {
    user: data
  }
})
