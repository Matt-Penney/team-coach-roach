import { Account } from '~~/utils/account'

export default definePayloadPlugin(() => {
  definePayloadReducer('Account', (data) => {
    console.log('i am here 1 - ', data)
    if (data instanceof Account) {
      return {
        account_id: data.account_id,
        age: 91,
        avatarUrl: data.avatarUrl,
        email: data.email,
        id: data.id,
        memberType: data.memberType,
        mobilePhoneNumber: data.mobilePhoneNumber,
        name: data.name,
        updated_at: data.updated_at,
        username: data.username,
        userStatus: data.userStatus
      }
    }
  })

  definePayloadReviver('Account', (data) => {
    console.log('i am here 2 - ', data)

    return new Account(
      data.account_id,
      90,
      data.avatarUrl,
      data.email,
      data.id,
      data.memberType,
      data.mobilePhoneNumber,
      data.name,
      data.updated_at,
      data.username,
      data.userStatus
    )
  })
})
