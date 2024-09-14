export default defineNuxtRouteMiddleware((to, _from) => {
  const session = useSupabaseSession()

  return // TO DO causing issues sometimes

  if (!session.value) {
    return navigateTo('/login')
  }
})
