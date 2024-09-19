<script setup lang="ts">
const loading = ref(true)

loading.value = true
const user = useAuthUser()
loading.value = false

// Get redirect path from cookies
const cookieName = useRuntimeConfig().public.supabase.cookieName
const _redirectPath = useCookie(`${cookieName}-redirect-path`).value
// TO DO make this into a nicer like loading overlay thing
watch(user, () => {
  if (user.value) { // TO DO if is-member nav to dashboard otherwise go back to '/'
    if (!useMember()) return navigateTo('/')
    // console.log('confirm.vue:14')
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
