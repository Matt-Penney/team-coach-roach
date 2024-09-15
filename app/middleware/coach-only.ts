export default defineNuxtRouteMiddleware(async (to, from) => {
  const isCoach = useCoach()

  if (!isCoach.value) return navigateTo(from)
})
