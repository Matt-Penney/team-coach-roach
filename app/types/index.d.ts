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

export interface Account {
  id: number
  name: string
  email: string
  age: number
  mobilePhoneNumber: string
}

// Dashboard shit

export interface Member {
  name: string
  username: string
  role: 'client' | 'coach' | 'admin' | 'none'
  avatar: Avatar
}

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'

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
