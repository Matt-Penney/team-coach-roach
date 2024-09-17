<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const client = useSupabaseClient()
const user = useAuthUser()

definePageMeta({
  layout: 'dashboard', // might be able to pass it through props or something rather than defining this on EACH page
  middleware: ['member-only']
})

const loading = ref(true)
const fileRef = ref<HTMLInputElement>()

loading.value = true
const account = useAccount().getAccountState()

const state = reactive({
  weight: 0,
  hasHitCardioTargets: false,
  hasHitNutritionalTargets: false,
  injuriesOrDiscomfort: '',
  sleepRating: '',
  nutritionRating: '',
  stressRating: '',
  notes: '',
  images: ['']
})
loading.value = false

function validate(state: any): FormError[] {
  const errors = []
  if (!state.images) errors.push({ path: 'images', message: 'Please provide some checkin images.' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data, ' - onSubmit checkin')
}

async function onFileChange(e: Event) {
  console.log('checkin images stuff')
  console.log(e.target.files as HTMLInputElement)

  state.images = e.target.files
}

function onFileClick() {
  fileRef.value?.click()
}
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
        </UDashboardSection>

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
            type="number"
            icon="i-heroicons-scale"
            size="md"
          />
        </UFormGroup>

        <UFormGroup
          name="hasHitCardioTargets"
          label="Did you complete all cardio?"
          class="grid grid-cols-2 gap-2 items-center"
          :ui="{ container: '' }"
          required
        >
          <UToggle v-model="state.hasHitCardioTargets" />
        </UFormGroup>

        <UFormGroup
          name="hasHitNutritionalTargets"
          label="Did you hit all nutritional targets?"
          class="grid grid-cols-2 gap-2 items-center"
          :ui="{ container: '' }"
          required
        >
          <UToggle v-model="state.hasHitNutritionalTargets" />
        </UFormGroup>

        <UFormGroup
          name="injuriesOrDiscomfort"
          label="Any injuries or discomfort?"
        >
          <UTextarea
            v-model="state.injuriesOrDiscomfort"
            autoresize
            :maxrows="5"
            placeholder="Describe any notes you have here."
          />
        </UFormGroup>

        <UFormGroup
          name="sleepRating"
          label="How is your sleep?"
        >
          <UTextarea
            v-model="state.sleepRating"
            autoresize
            :maxrows="5"
            placeholder="Describe any notes you have here."
          />
        </UFormGroup>

        <UFormGroup
          name="nutritionRating"
          label="How is your digestion?"
        >
          <UTextarea
            v-model="state.nutritionRating"
            autoresize
            :maxrows="5"
            placeholder="Describe any notes you have here."
          />
        </UFormGroup>

        <UFormGroup
          name="stressRating"
          label="How is your stress?"
        >
          <UTextarea
            v-model="state.stressRating"
            autoresize
            :maxrows="5"
            placeholder="Describe any notes you have here."
          />
        </UFormGroup>

        <UFormGroup
          name="notes"
          label="Is there anything else you would like to discuss with me?"
        >
          <UTextarea
            v-model="state.notes"
            autoresize
            :maxrows="5"
            placeholder="Describe any notes you have here."
          />
        </UFormGroup>

        <UFormGroup
          name="images"
          label="Checkin Images"
          class="grid grid-cols-2 gap-2"
          help="JPG, GIF or PNG. 5MB Max."
          :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }"
        >
          <UButton
            label="Choose"
            color="white"
            size="md"
            @click="onFileClick"
          />

          <input
            ref="fileRef"
            type="file"
            multiple
            class="hidden"
            accept=".jpg, .jpeg, .png, .gif"
            @change="onFileChange"
          >
        </UFormGroup>
      </UForm>
    </UDashboardPanel>
  </UDashboardPage>
</template>
