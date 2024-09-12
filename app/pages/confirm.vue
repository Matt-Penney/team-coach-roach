<script setup lang="ts">
const loading = ref(true)
const user = ref(null)

loading.value = true
user.value = useAuth().me().user
loading.value = false

// Get redirect path from cookies
const cookieName = useRuntimeConfig().public.supabase.cookieName
const _redirectPath = useCookie(`${cookieName}-redirect-path`).value

watch(user, () => {
  if (user.value) {
    // Clear cookie
    // useCookie(`${cookieName}-redirect-path`).value = null
    // Redirect to path
    // return navigateTo(redirectPath || '/dashboard')
    return navigateTo('/dashboard')
  }
}, { immediate: true })
</script>

<template>
  <div>Waiting for login...</div>
</template>
