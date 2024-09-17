export default defineNuxtRouteMiddleware(async (to, from) => {
  const isMember = await useMember()

  if (!(await isMember).value) return navigateTo(from)
})
