export const useAccount = () => {
  return useState('account', async () => await $fetch('/api/account/me', {
    headers: useRequestHeaders(['cookie'])
  }))
}
