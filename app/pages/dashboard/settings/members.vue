<script setup lang="ts">
import type { Member } from '~/types'

definePageMeta({
  layout: 'dashboard',
  middleware: ['coach-only']
})

const { data: members } = await useFetch<Member[]>('/api/members', { default: () => [], headers: useRequestHeaders(['cookie']) })

const q = ref('')
const isInviteModalOpen = ref(false)

const filteredMembers = computed(() => {
  return members.value.filter((member) => {
    return member.name.search(new RegExp(q.value, 'i')) !== -1 || member.username.search(new RegExp(q.value, 'i')) !== -1
  })
})
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      title="Manage access"
      description="Invite new members by email address."
      orientation="horizontal"
      :ui="{ container: 'lg:sticky top-2' }"
    >
      <template #links>
        <UButton
          label="Invite people"
          color="black"
          @click="isInviteModalOpen = true"
        />
      </template>

      <UCard
        :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }"
        class="min-w-0"
      >
        <template #header>
          <UInput
            v-model="q"
            icon="i-heroicons-magnifying-glass"
            placeholder="Search members"
            autofocus
          />
        </template>

        <!-- ~/components/Dashboard/settings/MembersList.vue -->
        <DashboardSettingsMembersList :members="filteredMembers" />
      </UCard>
    </UDashboardSection>

    <UDashboardModal
      v-model="isInviteModalOpen"
      title="Invite people"
      description="Invite new members by email address"
      :ui="{ width: 'sm:max-w-md' }"
    >
      <!-- ~/components/Dashboard/settings/MembersForm.vue -->
      <DashboardSettingsMembersForm @close="isInviteModalOpen = false" />
    </UDashboardModal>
  </UDashboardPanelContent>
</template>
