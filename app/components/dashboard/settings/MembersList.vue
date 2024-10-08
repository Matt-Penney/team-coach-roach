<script setup lang="ts">
import type { Member, MemberType } from '~/types'

const supabase = useSupabaseClient()
const loading = ref(true)

loading.value = true
// ?
loading.value = false

defineProps({
  members: {
    type: Array as PropType<Member[]>,
    default: () => []
  }
})

function getItems(member: Member) {
  return [[{
    label: 'Edit member',
    click: () => console.log('Edit', member)
  }, {
    label: 'Remove member',
    labelClass: 'text-red-500 dark:text-red-400',
    click: () => console.log('Remove', member)
  }]]
}

function onMemberTypeChange(member: Member, memberType: MemberType) {
  // Do something with data
  console.log(member.username, memberType)
}

async function getAvatar(avatarUrl) {
  if (!avatarUrl) return
  let src = ''
  try {
    const { data, error } = await supabase.storage.from('avatars').createSignedUrl(avatarUrl, 60) // TO DO doesnt work
    if (error) throw error
    else src = data.signedUrl
  } catch (error) {
    console.log('Error - ' + error)
  }
  return src
}
</script>

<template>
  <ul
    role="list"
    class="divide-y divide-gray-200 dark:divide-gray-800"
  >
    <li
      v-for="(member, index) in members"
      :key="index"
      class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6"
    >
      <div class="flex items-center gap-3 min-w-0">
        <UAvatar
          :src="member.avatarUrl"
          :alt="member.name"
          size="md"
        />

        <div class="text-sm min-w-0">
          <p class="text-gray-900 dark:text-white font-medium truncate">
            {{ member.name }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 truncate">
            {{ member.username }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <USelectMenu
          :model-value="member.memberType"
          :options="['client', 'coach']"
          color="white"
          :ui-menu="{ select: 'capitalize', option: { base: 'capitalize' } }"
          @update:model-value="onMemberTypeChange(member, $event)"
        />

        <UDropdown
          :items="getItems(member)"
          position="bottom-end"
        >
          <UButton
            icon="i-heroicons-ellipsis-vertical"
            color="gray"
            variant="ghost"
          />
        </UDropdown>
      </div>
    </li>
  </ul>
</template>
