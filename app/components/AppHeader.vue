<script setup lang="ts">
import type { NavItem } from '@nuxt/content'
import { useAuthUser } from '@/composables/useAuthUser'

const loading = ref(true)

loading.value = true
const user = useAuthUser()

loading.value = false

async function logout() {
  try {
    loading.value = true
    useAuth().logout()
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
    clearNuxtData('account')
  }
}

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [{
  label: 'Docs',
  to: '/docs'
}, {
  label: 'Pricing',
  to: '/pricing'
}, {
  label: 'Blog',
  to: '/blog'
},
{
  label: 'Dashboard',
  to: '/dashboard'
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <NuxtImg
        src="/logo.png"
        class="max-w-24"
      />
    </template>

    <template
      #right
    >
      <UButton
        v-if="user"
        label="Logout"
        color="gray"
        @click="logout"
      />
      <UButton
        v-if="!user"
        label="Sign in"
        color="gray"
        to="/login"
      />
      <UButton
        v-if="!user"
        label="Sign up"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="black"
        to="/signup"
        class="hidden lg:flex"
      />
    </template>

    <template #panel>
      <UNavigationTree
        :links="mapContentNavigation(navigation)"
        default-open
      />
    </template>
  </UHeader>
</template>
