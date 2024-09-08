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
},
{
  label: 'Dashboard TEMP',
  to: '/dashboard'
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <NuxtLink
        to="/"
      >
        <img
          src="https://teamcoachroach.com/wp-content/uploads/2022/09/Asset-2@216x.png"
          class="max-w-24"
        >
      </NuxtLink>
    </template>

    <template
      v-if="user"
      #right
    >
      <!-- make this better and use the 'account' type interface -->
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
