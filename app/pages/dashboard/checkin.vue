<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const client = useSupabaseClient()
const user = useAuthUser()

definePageMeta({
  layout: 'dashboard', // might be able to pass it through props or something rather than defining this on EACH page
  middleware: 'auth'
})

const loading = ref(true)

loading.value = true
const account = useAccount()

const state = reactive({
  weight: '',
  sleepRating: 0,
  foodRating: 0,
  exerciseRating: 0,
  notes: '',
  images: ''
})

function validate(state: any): FormError[] {
  const errors = []
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data, ' - onSubmit checkin')
}

loading.value = false
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Checkin" />

      <UForm
        :state="state"
        :validate="validate"
        :validate-on="['submit']"
        @submit="onSubmit"
      >
        <UDashboardSection
          title="Checkin"
          description="This information will be displayed only to yourself and a coach."
        >
          <template #links>
            <UButton
              type="submit"
              label="Save changes"
              color="black"
            />
          </template>
          <UFormGroup
            name="weight"
            label="Weight"
            description="Please enter the weight."
            help="KGs or Lbs"
            required
            class="grid grid-cols-2 gap-2 items-center"
            :ui="{ container: '' }"
          >
            <UInput
              v-model="state.weight"
              autocomplete="off"
              icon="i-heroicons-scale"
              size="md"
            />
          </UFormGroup>
        </UDashboardSection>
      </UForm>
    </UDashboardPanel>
  </UDashboardPage>
</template>
