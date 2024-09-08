<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/')
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
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Team Coach Roach
      <UBadge
        label="SaaS"
        variant="subtle"
        class="mb-0.5"
        to="/"
      />
    </template>

    <template
      v-if="user"
      #right
    >
      <p>Hello, {{ user.user_metadata.name }}</p>
      <UButton
        v-if="user"
        label="Logout"
        color="gray"
        @click="logout"
      />
    </template>
    <template
      v-else
      #right
    >
      <UButton
        label="Sign in"
        color="gray"
        to="/login"
      />
      <UButton
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
