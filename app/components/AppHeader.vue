<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const supabase = useSupabaseClient()
const accountName = ref('')
const loading = ref(true)
const user = ref(null)

loading.value = true
user.value = useAuth().me().user
console.log(user.value)

const { data } = await supabase // TO DO move to a single api call, many times this is being copy/pasted
  .from('account')
  .select('name')
  .eq('id', user?.value?.id)
  .single()
if (data) {
  accountName.value = data.name
}
loading.value = false

async function logout() {
  try {
    loading.value = true
    const { error } = useAuth().logout()
    if (error) throw error
    navigateTo('/')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
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
  label: 'Dashboard TEMP', // TO DO make this a button next to 'logout'? OOR better option is just make this button dynamic for when an account has been given a 'memberType' (this will be done via invite eventually)
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
      v-if="accountName"
      #right
    >
      <!-- make this better and use the 'account' type interface -->
      <p>Hello, {{ accountName }}</p>
      <UButton
        v-if="accountName"
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
