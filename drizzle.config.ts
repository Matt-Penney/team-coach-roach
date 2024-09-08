import { config } from 'dotenv'
import { defineConfig, type Config } from 'drizzle-kit'

config({ path: '.env' })

export default defineConfig({
  schemaFilter: ['public'],
  schema: './src/db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
} satisfies Config)
