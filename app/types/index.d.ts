import type { ParsedContent } from '@nuxt/content'
import type { Avatar, Badge, Link } from '#ui/types'

export interface BlogPost extends ParsedContent {
  title: string
  description: string
  date: string
  image?: HTMLImageElement
  badge?: Badge
  authors?: ({
    name: string
    description?: string
    avatar?: Avatar
  } & Link)[]
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface DateRange {
  startDate: Date
  endDate: Date
}

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'
export type MemberType = 'client' | 'coach' | 'admin'

export interface Account {
  account_id?: number
  name: string
  email: string
  age?: number
  mobilePhoneNumber?: string
  username?: string
  memberType?: string
  userStatus: string
  avatarUrl?: string
  location?: string
}

export interface Checkin {
  checkin_id: number
  account_id: number
  weight: number
  hasHitCardioTargets: boolean
  hasHitNutritionalTargets: boolean
  injuriesOrDiscomfort: string
  sleepRating: string
  nutritionRating: string
  stressRating: string
  notes: string
  images: string[]
  reviewed: boolean
}

export interface Member extends Account { // to remove eventually
  role?: MemberType
}

// export type UserWithoutPassword = Omit<User, 'password'>

// Dashboard shit TO DO aim to remove and use API to get instead

export interface User {
  id: number
  name: string
  email: string
  avatar?: Avatar
  status: UserStatus
  location: string
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export interface Range {
  start: Date
  end: Date
}
