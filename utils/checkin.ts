export class Checkin {
  checkin_id: number
  account_id: number
  created_at: Date | null
  updated_at: Date | null
  weight: number
  hasHitCardioTargets: boolean
  hasHitNutritionalTargets: boolean
  injuriesOrDiscomfort: string | null
  sleepRating: string | null
  nutritionRating: string | null
  stressRating: string | null
  notes: string | null
  images: string[]
  reviewed: boolean

  constructor(checkin_id: number, account_id: number, created_at: Date, updated_at: Date,
    weight: number, hasHitCardioTargets: boolean, hasHitNutritionalTargets: boolean,
    injuriesOrDiscomfort: string | null, sleepRating: string | null, nutritionRating: string | null,
    stressRating: string | null, notes: string | null, images: string[], reviewed: boolean) {
    this.checkin_id = checkin_id
    this.account_id = account_id
    this.created_at = created_at
    this.updated_at = updated_at
    this.weight = weight
    this.hasHitCardioTargets = hasHitCardioTargets
    this.hasHitNutritionalTargets = hasHitNutritionalTargets
    this.injuriesOrDiscomfort = injuriesOrDiscomfort
    this.sleepRating = sleepRating
    this.nutritionRating = nutritionRating
    this.stressRating = stressRating
    this.notes = notes
    this.images = images
    this.reviewed = reviewed
  }
}
