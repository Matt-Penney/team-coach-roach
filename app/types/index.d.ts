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
  role: 'client' | 'coach'
  avatar?: Avatar
}
