export const useAuth = () => {
  const authUser = useSupabaseUser()

  const setUser = (user: any) => {
    authUser.value = user
  }

  const setCookie = (cookie: any) => {
    cookie.value = cookie
  }

  const login = async (email: string, password: string) => {
    const data = await $fetch('/auth/login', {
      method: 'POST',
      body: {
        email,
        password
      }
    })

    setUser(data.user)
    return authUser
  }

  const logout = async () => {
    const data = await $fetch('/auth/logout', {
      method: 'POST'
    })

    setUser(data.user)
  }

  const me = async () => {
    if (!authUser.value) {
      try {
        const data = await $fetch('/api/me')
        setUser(data.user)
      } catch (error) {
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
