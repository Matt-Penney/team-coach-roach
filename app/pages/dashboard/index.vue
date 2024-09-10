<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range, Member } from '~/types'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

// make a global function for this
const logout = async () => {
  const { error } = await supabase.auth.signOut()
  navigateTo('/')
  if (error) console.log(error)
}

definePageMeta({
  layout: 'dashboard'
})

const { data: page } = await useAsyncData('dashboard', () => queryContent('/dashboard').findOne())
if (!page.value) {
  console.log(page)
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
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

const member = ref<Member>({
  accountId: 999,
  name: 'Matt Penney',
  email: 'blah@blah.com',
  username: 'mattpenney00',
  mobilePhoneNumber: '07111111222',
  memberType: 'coach',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/antfu' },
  userStatus: 'subscribed'
}) // make it just get their own logged in account, clients shouldnt be able to select/see other users

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
