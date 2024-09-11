import { serverSupabaseClient } from '#supabase/server'
import type { Member } from '~/types'

export default eventHandler(async (event): Promise<Member[]> => {
  // TO DO this might need a middleware check that only the permitted people can come use this, look at nuxt3Auth example uses async functions for only admin roles
  const client = await serverSupabaseClient(event)

  const { data } = await client.from('account').select('account_id, name, email, age, mobilePhoneNumber, username, avatarUrl, memberType, userStatus')
    .in('memberType', ['client', 'coach'])
    .order('name', { ascending: false })

  return data as Member[]

  // const members: Member[] = [] TO DO get this to work maybe? ideally

  // data?.forEach((member: Member) => {
  //   const dto: Member = {
  //     accountId: member.accountId,
  //     name: member.name,
  //     email: member.email,
  //     age: member.age,
  //     mobilePhoneNumber: member.mobilePhoneNumber,
  //     username: member.username,
  //     userStatus: member.userStatus,
  //     avatar: member.avatar,
  //     memberType: member.memberType
  //   }

  //   members.concat(dto)
  // })

  // return members
})

// const members = [{
//   name: 'Anthony Fu',
//   username: 'antfu',
//   memberType: 'client',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/antfu' }
// }, {
//   name: 'Sébastien Chopin',
//   username: 'Atinux',
//   memberType: 'coach',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux' }
// }, {
//   name: 'Benjamin Canac',
//   username: 'benjamincanac',
//   memberType: 'client',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/benjamincanac' }
// }, {
//   name: 'Céline Dumerc',
//   username: 'celinedumerc',
//   memberType: 'client',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/celinedumerc' }
// }, {
//   name: 'Daniel Roe',
//   username: 'danielroe',
//   memberType: 'client',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/danielroe' }
// }, {
//   name: 'Farnabaz',
//   username: 'farnabaz',
//   memberType: 'client',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/farnabaz' }
// }, {
//   name: 'Ferdinand Coumau',
//   username: 'FerdinandCoumau',
//   memberType: 'client',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/FerdinandCoumau' }
// }, {
//   name: 'Florent Delerue',
//   username: 'Flosciante',
//   memberType: 'client',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/Flosciante' }
// }, {
//   name: 'Baptiste Leproux',
//   username: 'larbish',
//   memberType: 'client',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/larbish' }
// }, {
//   name: 'Pooya Parsa',
//   username: 'pi0',
//   memberType: 'client',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/pi0' }
// }, {
//   name: 'Sarah Moriceau',
//   username: 'SarahM19',
//   memberType: 'client',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/SarahM19' }
// }, {
//   name: 'Sylvain Marroufin',
//   username: 'smarroufin',
//   memberType: 'client',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/smarroufin' }
// }]

// export default eventHandler(async () => {
//   return members
// })
