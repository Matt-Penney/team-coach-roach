<script setup lang="ts">
const { isHelpSlideoverOpen } = useDashboard()
const { isDashboardSearchModalOpen } = useUIState()
const { metaSymbol } = useShortcuts()
const supabase = useSupabaseClient()

definePageMeta({
  middleware: 'auth'
})

const loading = ref(true)
const account = ref(null)
const avatarUrl = ref('')
const user = ref(null)

loading.value = true
user.value = useAuth().me().user // TO DO make use of useAsyncData, defo good to use for many things

const { data } = await supabase
  .from('account')
  .select('account_id, name, email, avatarUrl')
  .eq('id', user.value.id)
  .single()
if (data) {
  account.value = data
}
loading.value = false

const items = computed(() => [
  [{
    slot: 'Account',
    label: '',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/dashboard/settings'
  }, {
    label: 'Command menu',
    icon: 'i-heroicons-command-line',
    shortcuts: [metaSymbol.value, 'K'],
    click: () => {
      isDashboardSearchModalOpen.value = true
    }
  }, {
    label: 'Help & Support',
    icon: 'i-heroicons-question-mark-circle',
    shortcuts: ['?'],
    click: () => isHelpSlideoverOpen.value = true
  }], [{
    label: 'Documentation',
    icon: 'i-heroicons-book-open',
    to: 'https://ui.nuxt.com/pro/getting-started',
    target: '_blank'
  }, {
    label: 'GitHub repository',
    icon: 'i-simple-icons-github',
    to: 'https://github.com/nuxt-ui-pro/dashboard',
    target: '_blank'
  }, {
    label: 'Buy Nuxt UI Pro',
    icon: 'i-heroicons-credit-card',
    to: 'https://ui.nuxt.com/pro/purchase',
    target: '_blank'
  }], [{
    label: 'Leave Dashboard',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    to: '/'
  }]
])

onMounted(() => { // TO DO this sucks
  getAvatar()
})

async function getAvatar() { // TO DO this kinda sucks, I dont want to have to get this image each time it needed, rather just have a single signed URL to use in multiple places
  if (!account.value.avatarUrl) return

  try {
    const { data, error } = await supabase.storage.from('avatars').createSignedUrl(account.value.avatarUrl, 60)
    if (error) throw error
    avatarUrl.value = data.signedUrl
  } catch (error) {
    console.log('Error - ' + error)
  }
}
</script>

<template>
  <UDropdown
    mode="hover"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        class="w-full"
        :label="account.name"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template #leading>
          <UAvatar
            :src="avatarUrl"
            :alt="account.name"
            size="2xs"
          />
        </template>

        <template #trailing>
          <UIcon
            name="i-heroicons-ellipsis-vertical"
            class="w-5 h-5 ml-auto"
          />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ account.email }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>
