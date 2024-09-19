import { serverSupabaseClient } from '#supabase/server'
import type { UserStatus } from '~/types'
import type { Account } from '~~/utils/account'

// const users: User[] = [{
//   id: 1,
//   name: 'Alex Smith',
//   email: 'alex.smith@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=1'
//   },
//   status: 'subscribed',
//   location: 'New York, USA'
// }, {
//   id: 2,
//   name: 'Jordan Brown',
//   email: 'jordan.brown@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=2'
//   },
//   status: 'unsubscribed',
//   location: 'London, UK'
// }, {
//   id: 3,
//   name: 'Taylor Green',
//   email: 'taylor.green@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=3'
//   },
//   status: 'bounced',
//   location: 'Paris, France'
// }, {
//   id: 4,
//   name: 'Morgan White',
//   email: 'morgan.white@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=4'
//   },
//   status: 'subscribed',
//   location: 'Berlin, Germany'
// }, {
//   id: 5,
//   name: 'Casey Gray',
//   email: 'casey.gray@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=5'
//   },
//   status: 'subscribed',
//   location: 'Tokyo, Japan'
// }, {
//   id: 6,
//   name: 'Jamie Johnson',
//   email: 'jamie.johnson@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=6'
//   },
//   status: 'subscribed',
//   location: 'Sydney, Australia'
// }, {
//   id: 7,
//   name: 'Riley Davis',
//   email: 'riley.davis@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=7'
//   },
//   status: 'subscribed',
//   location: 'New York, USA'
// }, {
//   id: 8,
//   name: 'Kelly Wilson',
//   email: 'kelly.wilson@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=8'
//   },
//   status: 'subscribed',
//   location: 'London, UK'
// }, {
//   id: 9,
//   name: 'Drew Moore',
//   email: 'drew.moore@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=9'
//   },
//   status: 'bounced',
//   location: 'Paris, France'
// }, {
//   id: 10,
//   name: 'Jordan Taylor',
//   email: 'jordan.taylor@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=10'
//   },
//   status: 'subscribed',
//   location: 'Berlin, Germany'
// }, {
//   id: 11,
//   name: 'Morgan Anderson',
//   email: 'morgan.anderson@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=11'
//   },
//   status: 'subscribed',
//   location: 'Tokyo, Japan'
// }, {
//   id: 12,
//   name: 'Casey Thomas',
//   email: 'casey.thomas@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=12'
//   },
//   status: 'unsubscribed',
//   location: 'Sydney, Australia'
// }, {
//   id: 13,
//   name: 'Jamie Jackson',
//   email: 'jamie.jackson@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=13'
//   },
//   status: 'unsubscribed',
//   location: 'New York, USA'
// }, {
//   id: 14,
//   name: 'Riley White',
//   email: 'riley.white@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=14'
//   },
//   status: 'unsubscribed',
//   location: 'London, UK'
// }, {
//   id: 15,
//   name: 'Kelly Harris',
//   email: 'kelly.harris@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=15'
//   },
//   status: 'subscribed',
//   location: 'Paris, France'
// }, {
//   id: 16,
//   name: 'Drew Martin',
//   email: 'drew.martin@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=16'
//   },
//   status: 'subscribed',
//   location: 'Berlin, Germany'
// }, {
//   id: 17,
//   name: 'Alex Thompson',
//   email: 'alex.thompson@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=17'
//   },
//   status: 'unsubscribed',
//   location: 'Tokyo, Japan'
// }, {
//   id: 18,
//   name: 'Jordan Garcia',
//   email: 'jordan.garcia@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=18'
//   },
//   status: 'subscribed',
//   location: 'Sydney, Australia'
// }, {
//   id: 19,
//   name: 'Taylor Rodriguez',
//   email: 'taylor.rodriguez@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=19'
//   },
//   status: 'bounced',
//   location: 'New York, USA'
// }, {
//   id: 20,
//   name: 'Morgan Lopez',
//   email: 'morgan.lopez@example.com',
//   avatar: {
//     src: 'https://i.pravatar.cc/128?u=20'
//   },
//   status: 'subscribed',
//   location: 'London, UK'
// }]

export default eventHandler(async (event): Promise<Account[]> => {
  const { q, statuses, /* locations, */sort, order } = getQuery(event) as { q?: string, statuses?: UserStatus[], locations?: string[], sort?: 'name' | 'email', order?: 'asc' | 'desc' }

  const client = await serverSupabaseClient(event)
  const { data } = await client.from('account').select('*').returns<Account[]>() // TO DO for each 'data' map to Account type

  return data!.filter((account: Account) => {
    if (!q) return true

    return account.name.search(new RegExp(q, 'i')) !== -1 || account.email.search(new RegExp(q, 'i')) !== -1
  }).filter((account: Account) => {
    if (!statuses?.length) return true

    return statuses.includes(account.userStatus as UserStatus) // TO DO fix class to use enum
  })/* .filter((account: Account) => {
    if (!locations!.length) return true

    return locations!.includes(account.location!) TO DO location stuff might be good, for now not being used so just commenting out in case i want it back
  }) */.sort((a, b) => {
      if (!sort) return 0

      const aValue = a[sort]
      const bValue = b[sort]

      if (aValue < bValue) return order === 'asc' ? -1 : 1
      if (aValue > bValue) return order === 'asc' ? 1 : -1
      return 0
    })
})
