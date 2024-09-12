export const useAdmin = () => {
  const authUser = useSupabaseUser()

  return computed(() => {
    if (!authUser.value) return false

    return authUser.value.role.includes('ADMIN')
  })
}
