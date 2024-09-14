<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range, Member } from '~/types'

const supabase = useSupabaseClient()
const user = useAuthUser()
const loading = ref(true)

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { data: page } = await useAsyncData('dashboard', () => queryContent('/dashboard').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

loading.value = true
const account = useAccount()

const { data: avatarSignedUrl } = await useAsyncData('avatarSignedUrl', () => getAvatar())
// const member = ref<Member>(account.value)
const member = ref<Member>([])
loading.value = false

async function getAvatar() { // TO DO this kinda sucks, I dont want to have to get this image each time it needed, rather just have a single signed URL to use in multiple places
  if (!account.value.avatarUrl) return
  if (avatarSignedUrl) return avatarSignedUrl

  try {
    const { data, error } = await supabase.storage.from('avatars').createSignedUrl(account.value.avatarUrl, 60)
    if (error) throw error
    else return data.signedUrl
  } catch (error) {
    console.log('Error - ' + error)
  }
}

// make a global function for this, partially done
const logout = async () => {
  try {
    loading.value = true
    const { error } = useAuth().logout()
    if (error) throw error
    navigateTo('/')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
    clearNuxtData('account')
  }
}

const { isNotificationsSlideoverOpen } = useDashboard()

const items = [[{
  label: 'New mail',
  icon: 'i-heroicons-paper-airplane',
  to: '/dashboard/inbox'
}, {
  label: 'New account',
  icon: 'i-heroicons-user-plus',
  to: '/dashboard/accounts' // TO DO wanna change this to accounts but need to fix routing
}]]

const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() })
const period = ref<Period>('daily')

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage({
  component: 'Saas',
  title: page.value.title,
  description: page.value.description
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Home">
        <template #left>
          <NuxtLink
            to="/"
          >
            <img
              src="https://teamcoachroach.com/wp-content/uploads/2022/09/Asset-2@216x.png"
              class="max-w-24"
            >
          </NuxtLink>
        </template>

        <template #right>
          <UTooltip
            text="Notifications"
            :shortcuts="['N']"
          >
            <UButton
              color="gray"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip
                color="red"
                inset
              >
                <UIcon
                  name="i-heroicons-bell"
                  class="w-5 h-5"
                />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdown :items="items">
            <UButton
              icon="i-heroicons-plus"
              size="md"
              class="ml-1.5 rounded-full"
            />
          </UDropdown>

          <UButton
            v-if="user"
            label="Logout"
            color="gray"
            @click="logout"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- ~/components/dashboard/home/HomeDateRangePicker.vue -->
          <DashboardHomeDateRangePicker
            v-model="range"
            class="-ml-2.5"
          />

          <!-- ~/components/dashboard/home/HomePeriodSelect.vue -->
          <DashboardHomePeriodSelect
            v-model="period"
            :range="range"
          />
        </template>

        <template #right>
          <!-- ~/components/dashboard/home/HomeMemberSelect.vue -->
          <DashboardHomeMemberSelect
            v-model="member"
          />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <!-- ~/components/dashboard/home/HomeChart.vue -->
        <DashboardHomeChart
          :period="period"
          :range="range"
        />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <!-- ~/components/dashboard/home/HomeSales.vue -->
          <DashboardHomeSales />
          <!-- ~/components/dashboard/home/HomeCountries.vue -->
          <DashboardHomeCountries />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
