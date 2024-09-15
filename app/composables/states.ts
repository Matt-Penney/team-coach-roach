import type { Account } from '~~/utils/account'

export const useAccount = () => {
  const accountState = useState<Account>('account')

  const setAccountState = async () => {
    const currentAccount = await getAccountStoreDate()
    accountState.value = currentAccount.value
  }

  const getAccountState = () => {
    if (!accountState.value) console.error('No accountState set loool')
    return accountState
  }

  return {
    setAccountState,
    getAccountState
  }
}

async function getAccountStoreDate() {
  const response = ref<Account>()

  await $fetch('/api/account/me', {
    headers: useRequestHeaders(['cookie'])
  }).then((data) => {
    response.value = data
  }).catch(() => {
    // nothing
  })

  return response
}
