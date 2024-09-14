import type { Account } from '~/types'

export const useAuth = () => {
  const authUser = useSupabaseUser()

  const setUser = (user: any) => {
    authUser.value = user
  }

  const setCookie = (cookie: any) => {
    cookie.value = cookie
  }

  const login = async (email: string, password: string) => {
    const client = useSupabaseClient()
    const { data, error } = await client.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error) throw error

    setUser(data)
    return authUser
  }

  const logout = async () => {
    const client = useSupabaseClient()
    const { error } = await client.auth.signOut()

    if (error) throw error

    setUser(null)
    navigateTo('/')
  }

  const me = async () => {
    if (!authUser.value) {
      try {
        const data: any = await $fetch('/api/me')
        setUser(data)
      } catch (error) {
        // console.log('useAuth:Ln40 - ', error)
        setCookie(null)
      }
    }

    return authUser
  }

  return {
    login,
    logout,
    me
  }
}
