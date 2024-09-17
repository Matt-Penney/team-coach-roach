export const useMember = async () => {
  const account = useAccount().getAccountState()

  if (!account.value) {
    console.log('useMember:5')
    await useAccount().setAccountState()
  }
  return computed(() => {
    if (!account.value || !account.value.memberType) {
      return false
    }

    return account.value.memberType ? true : false
  })
}
