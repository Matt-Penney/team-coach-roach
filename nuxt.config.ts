// https://nuxt.com/docs/api/configuration/nuxt-config
const ONE_DAY = 60 * 60 * 24 * 1000
const ONE_WEEK = ONE_DAY * 7

export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxtjs/supabase'
  ],

  ui: {
    safelistColors: ['primary', 'red', 'orange', 'green']
  },

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c => ['UButton'].includes(c.pascalName))

      globals.forEach(c => c.global = true)
    }
  },

  colorMode: {
    disableTransition: true
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    '/': { prerender: true },
    '/dashboard': { prerender: true },
    '/api/search.json': { prerender: true },
    '/docs': { redirect: '/docs/getting-started', prerender: false }
  },

  devtools: {
    enabled: true
  },

  typescript: {
    strict: false
  },

  future: {
    compatibilityVersion: 4
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  compatibilityDate: '2024-07-11',

  devServer: {
    // host: '0.0.0.0',
    host: 'localhost',
    port: 3000
  },

  supabase: { // TO DO use SSL https://supabase.com/docs/guides/database/connecting-to-postgres#connecting-with-drizzle
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/signup', '/docs', '/blog', '/pricing'],
      cookieRedirect: false // TO DO see if i can fix this for be 'true'
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        // autoRefreshToken: isBrowser(),
        // detectSessionInUrl: isBrowser(),
        persistSession: true
      }
    }

  },

  runtimeConfig: { // TO DO check on this, supabase might already handle it and I just need to support it
    // cookieName: '__session',
    // cookieSecret: 'secret',
    // cookieExpires: ONE_DAY.toString(),
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    }
  }
})
