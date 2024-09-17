import { Account } from '~~/utils/account'
import { Checkin } from '~~/utils/checkin'

export default definePayloadPlugin(() => {
  definePayloadReducer('Account', (data) => {
    console.log('payload:account - ', data)
    if (data instanceof Account) {
      return {
        account_id: data.account_id,
        age: data.age,
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
    console.log('payload:account:25 - ', data)

    return new Account(
      data.account_id,
      data.age,
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

  definePayloadReducer('Checkin', (data) => {
    console.log('payload:checkin - ', data)
    if (data instanceof Checkin) {
      return {
        checkin_id: data.checkin_id,
        account_id: data.account_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        weight: data.weight,
        hasHitCardioTargets: data.hasHitCardioTargets,
        hasHitNutritionalTargets: data.hasHitNutritionalTargets,
        injuriesOrDiscomfort: data.injuriesOrDiscomfort,
        sleepRating: data.sleepRating,
        nutritionRating: data.nutritionRating,
        stressRating: data.stressRating,
        notes: data.notes,
        images: data.images,
        reviewed: data.reviewed
      }
    }
  })

  definePayloadReviver('Checkin', (data) => {
    console.log('payload:checkin:65 - ', data)
    return new Checkin(
      data.checkin_id,
      data.account_id,
      data.created_at,
      data.updated_at,
      data.weight,
      data.hasHitCardioTargets,
      data.hasHitNutritionalTargets,
      data.injuriesOrDiscomfort,
      data.sleepRating,
      data.nutritionRating,
      data.stressRating,
      data.notes,
      data.images,
      data.reviewed
    )
  })
})
