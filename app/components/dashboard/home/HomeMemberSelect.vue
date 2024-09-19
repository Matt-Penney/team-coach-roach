<script setup lang="ts">
import type { Member } from '~/types'

const props = defineProps({
  members: {
    type: Object as PropType<Member[]>,
    required: true
  }
})

const model = defineModel({
  type: Object as PropType<Member>,
  required: true
})
// console.log('Model - ', model)
</script>

<template>
  <USelectMenu
    v-if="props.members.length > 1"
    v-slot="{ open }"
    v-model="model"
    searchable
    searchable-placeholder="Search a client..."
    :options="members"
    option-attribute="name"
    :ui-menu="{ width: 'w-60', option: { base: 'capitalize' } }"
    :popper="{ placement: 'bottom-start' }"
    :search-attributes="['name']"
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
