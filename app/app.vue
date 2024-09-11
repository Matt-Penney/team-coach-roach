<script setup lang="ts">
const colorMode = useColorMode()
const supabase = useSupabaseClient()

const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')

const authUser = ref()
const router = useRouter()
onMounted(() => {
  supabase.auth.onAuthStateChange((_, _session) => {
    console.log('AUTH CHANGED')
    return // TO DO investigate and try get some sort of session/user/cookie handling going on mate
    if (_session) {
      authUser.value = _session.user
      router.push('/dashboard')
    } else {
      authUser.value = undefined
      router.push('/login')
    }
  })
})

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: 'https://teamcoachroach.com/wp-content/uploads/2022/09/Asset-2@216x.png' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s - Team Coach Roach',
  ogImage: 'https://saas-template.nuxt.dev/social-card.png',
  twitterImage: 'https://saas-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
