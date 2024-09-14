<script setup lang="ts">
import type { Member, MemberType } from '~/types'

// const { data: members } = await useFetch<Member[]>('/api/members', { default: () => [], headers: useRequestHeaders(['cookie']) })
const { data: members } = await useFetch<Member[]>('/api/members', { default: () => [] })

const model = defineModel({
  type: Object as PropType<Member>, // TO DO fix warning of 'invalid prop', fixed?
  required: true
})
console.log('Model - ', model)

function onMemberChange(member: Member, memberType: MemberType) {
  // Do something with data
  // TO DO add a URL param using the username and use that to drive the current dashboard showing a clients info
  console.log(member.username, memberType)
}
</script>

<template>
  <USelectMenu
    v-if="members.length > 1"
    v-slot="{ open }"
    v-model="model"
    searchable
    searchable-placeholder="Search a client..."
    :options="members"
    option-attribute="name"
    :ui-menu="{ width: 'w-60', option: { base: 'capitalize' } }"
    :popper="{ placement: 'bottom-start' }"
    :search-attributes="['name']"
    @update:model-value="onMemberChange(model, $event)"
  >
    <UButton
      :label="model.name"
      color="gray"
      variant="ghost"
      class="capitalize"
      :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    >
      <div class="flex items-center gap-3 min-w-0">
        <UAvatar
          v-bind="model.avatar"
          size="md"
        />
        <div class="text-sm min-w-0">
          <p class="text-gray-900 dark:text-white font-medium truncate">
            {{ model.name }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 truncate">
            {{ model.username }}
          </p>
        </div>
      </div>
    </UButton>
  </USelectMenu>
  <div
    v-else
    class="flex items-center gap-3 min-w-0"
  >
    <UAvatar
      :src="model.avatarUrl"
      :alt="model.name"
      size="md"
    />

    <div class="text-sm min-w-0">
      <p class="text-gray-900 dark:text-white font-medium truncate">
        {{ model.name }}
      </p>
      <p class="text-gray-500 dark:text-gray-400 truncate">
        {{ model.username }}
      </p>
    </div>
  </div>
</template>
