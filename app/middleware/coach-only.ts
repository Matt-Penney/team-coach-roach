export default defineNuxtRouteMiddleware(async (to, from) => {
  const isCoach = useCoach()

  if (!(await isCoach).value) return navigateTo(from)
})
