export const useCoach = () => {
  const account = useAccount()

  return computed(() => {
    if (!account.value || !account.value.memberType) {
      return false
    }

    return account.value.memberType.includes('coach')
  })
}
