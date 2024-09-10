<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()

definePageMeta({
  layout: 'dashboard'
})

const links = [{
  id: 'home',
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/dashboard',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }
}, {
  id: 'inbox',
  label: 'Inbox',
  icon: 'i-heroicons-inbox',
  to: '/dashboard/inbox',
  badge: '4',
  tooltip: {
    text: 'Inbox',
    shortcuts: ['G', 'I']
  }
}, {
  id: 'accounts',
  label: 'Accounts',
  icon: 'i-heroicons-user-group',
  to: '/dashboard/accounts',
  tooltip: {
    text: 'Accounts',
    shortcuts: ['G', 'A']
  }
}, {
  id: 'settings',
  label: 'Settings',
  to: '/dashboard/settings',
  icon: 'i-heroicons-cog-8-tooth',
  children: [{
    label: 'General',
    to: '/dashboard/settings',
    exact: true
  }, {
    label: 'Members',
    to: '/dashboard/settings/members'
  }, {
    label: 'Notifications',
    to: '/dashboard/settings/notifications'
  }],
  tooltip: {
    text: 'Settings',
    shortcuts: ['G', 'S']
  }
}]

const footerLinks = [{
  label: 'Invite people',
  icon: 'i-heroicons-plus',
  to: '/dashboard/settings/members'
}, {
  label: 'Help & Support',
  icon: 'i-heroicons-question-mark-circle',
  click: () => isHelpSlideoverOpen.value = true
}]

const groups = [{
  key: 'links',
  label: 'Go to',
  commands: links.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts }))
}, {
  key: 'code',
  label: 'Code',
  commands: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    click: () => {
      window.open(`https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${route.path === '/' ? '/index' : route.path}.vue`, '_blank')
    }
  }]
}]

const defaultColors = ref(['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map(color => ({ label: color, chip: color, click: () => appConfig.ui.primary = color })))
const colors = computed(() => defaultColors.value.map(color => ({ ...color, active: appConfig.ui.primary === color.label })))
</script>

<template>
  <div>
    <UDashboardLayout>
      <UDashboardPanel
        :width="250"
        :resizable="{ min: 200, max: 300 }"
        collapsible
      >
        <UDashboardNavbar
          class="!border-transparent"
          :ui="{ left: 'flex-1' }"
        >
          <template #left>
            <DashboardTeamsDropdown />
          </template>
        </UDashboardNavbar>

        <UDashboardSidebar>
          <template #header>
            <UDashboardSearchButton />
          </template>

          <UDashboardSidebarLinks :links="links" />

          <UDivider />

          <UDashboardSidebarLinks
            :links="[{ label: 'Colours', draggable: true, children: colors }]"
            @update:links="colors => defaultColors = colors"
          />

          <div class="flex-1" />

          <UDashboardSidebarLinks :links="footerLinks" />

          <UDivider class="sticky bottom-0" />

          <template #footer>
            <!-- ~/components/dashboard/UserDropdown.vue -->
            <DashboardUserDropdown />
          </template>
        </UDashboardSidebar>
      </UDashboardPanel>

      <slot />

      <!-- ~/components/dashboard/HelpSlideover.vue -->
      <DashboardHelpSlideover />
      <!-- ~/components/dashboard/NotificationsSlideover.vue -->
      <DashboardNotificationsSlideover />

      <ClientOnly>
        <LazyUDashboardSearch :groups="groups" />
      </ClientOnly>
    </UDashboardLayout>
  </div>
</template>
