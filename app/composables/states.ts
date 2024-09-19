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

  const clearAccountState = () => [
    clearNuxtState('account')
  ]

  return {
    setAccountState,
    getAccountState,
    clearAccountState
  }
}

async function getAccountStoreDate() {
  const response = ref<Account>()

  await $fetch('/api/account/me', {
    headers: useRequestHeaders(['cookie'])
  }).then((data) => {
    response.value = data
  }).catch((error) => {
    // nothing
    console.log('states.ts:32 - ', error)
  })

  return response
}
