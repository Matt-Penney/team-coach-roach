export class Account {
  account_id: number
  age: number | null
  avatarUrl: string | null
  email: string
  id: string
  memberType: string | null // TO DO make into enum
  mobilePhoneNumber: string | null
  name: string
  updated_at: string | null
  username: string | null
  userStatus: string // TO DO make into enum

  constructor(account_id: number, age: number | null, avatarUrl: string | null, email: string,
    id: string, memberType: string | null, mobilePhoneNumber: string | null, name: string,
    updated_at: string | null, username: string | null, userStatus: string) {
    this.account_id = account_id
    this.age = age
    this.avatarUrl = avatarUrl
    this.email = email
    this.id = id
    this.memberType = memberType
    this.mobilePhoneNumber = mobilePhoneNumber
    this.name = name
    this.updated_at = updated_at
    this.username = username
    this.userStatus = userStatus
  }
}

export class Member extends Account {
  nope: string | null
  constructor(account_id: number, age: number | null, avatarUrl: string | null, email: string,
    id: string, memberType: string | null, mobilePhoneNumber: string | null, name: string,
    updated_at: string | null, username: string | null, userStatus: string, nope: string | null) {
    super(account_id, age, avatarUrl, email, id, memberType, mobilePhoneNumber, name, updated_at, username, userStatus)
    this.nope = nope
  }
}
