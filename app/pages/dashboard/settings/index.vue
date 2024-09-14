<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { Account } from '~/types/index.js'

const client = useSupabaseClient()
const user = useAuthUser()

definePageMeta({
  layout: 'dashboard', // might be able to pass it through props or something rather than defining this on EACH page
  middleware: 'auth'
})

const loading = ref(true)
const files = ref()

loading.value = true
const account = useAccount()
// const { data: avatarSignedUrl } = useNuxtData('avatarSignedUrl')
const { data: avatarSignedUrl } = await useAsyncData('avatarSignedUrl', () => getAvatar())

loading.value = false

const fileRef = ref<HTMLInputElement>()
const isDeleteAccountModalOpen = ref(false)

const state = reactive({
  name: account.value.name,
  email: account.value.email,
  username: account.value.username
  // avatar: account.value.avatarUrl
})

const toast = useToast()

function validate(state: any): FormError[] {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Please enter your name.' })
  if (!state.email) errors.push({ path: 'email', message: 'Please enter your email.' })
  if ((state.password_current && !state.password_new) || (!state.password_current && state.password_new)) errors.push({ path: 'password', message: 'Please enter a valid password.' })
  return errors
}

async function onFileChange(e: Event) {
  files.value = e.target.files

  if (!files.value || files.value.length === 0) {
    throw new Error('You must select an image to upload.')
  }

  // if ((account.value.username !== state.username) || !state.username) return // TO DO probs save profile then upload avatar idk, needs to have a username entered first

  const file = files.value[0]
  const fileExt = file.name.split('.').pop()
  const fileName = `avatar.${fileExt}`
  const filePath = `/${account.value.username}/${fileName}`

  try {
    loading.value = true
    const { error } = await client.storage.from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      }) // TO DO replace existing file/dupes

    if (error) throw error
    else {
      await supabase.from('account')
        .update({ avatarUrl: filePath })
        .eq('id', user.value.id)
    }
    toast.add({ title: 'Avatar updated successfully', icon: 'i-heroicons-check-circle' })
  } catch (error) {
    console.log('Error - ' + error)
    toast.add({ title: 'Avatar upload failed', icon: 'i-heroicons-exclamation-circle', color: 'red' })
  } finally {
    loading.value = false
  }
}

function onFileClick() {
  fileRef.value?.click()
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)

  try {
    loading.value = true
    const { data, error } = await supabase
      .from('account')
      .update({ name: state.name, email: state.email, username: state.username })
      .eq('id', user.value.id)
      .select()
    if (error) throw error
    else account.value = data
    toast.add({ title: 'Profile updated successfully', icon: 'i-heroicons-check-circle' })
  } catch (error) {
    console.log('Error - ' + error)
    toast.add({ title: 'Profile update failed', icon: 'i-heroicons-exclamation-circle', color: 'red' })
  } finally {
    loading.value = false
  }

  // TO DO when they update their username, need to update buckets too
}

async function getAvatar() {
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
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      title="Theme"
      description="Customize the look and feel of your dashboard."
    >
      <template #links>
        <UColorModeSelect color="gray" />
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <UForm
      :state="state"
      :validate="validate"
      :validate-on="['submit']"
      @submit="onSubmit"
    >
      <UDashboardSection
        title="Profile"
        description="This information will be displayed publicly so be careful what you share."
      >
        <template #links>
          <UButton
            type="submit"
            label="Save changes"
            color="black"
          />
        </template>

        <UFormGroup
          name="name"
          label="Name"
          description="Will appear on receipts, invoices, and other communication."
          required
          class="grid grid-cols-2 gap-2 items-center"
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.name"
            autocomplete="off"
            icon="i-heroicons-user"
            size="md"
          />
        </UFormGroup>

        <UFormGroup
          name="email"
          label="Email"
          description="Used to sign in, for email receipts and product updates."
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.email"
            type="email"
            autocomplete="off"
            icon="i-heroicons-envelope"
            size="md"
          />
        </UFormGroup>

        <UFormGroup
          name="username"
          label="Username"
          description="Your unique username for logging in and your profile URL."
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.username"
            type="username"
            autocomplete="off"
            size="md"
          />
        </UFormGroup>

        <UFormGroup
          name="avatar"
          label="Avatar"
          class="grid grid-cols-2 gap-2"
          help="JPG, GIF or PNG. 1MB Max."
          :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }"
        >
          <UAvatar
            :src="avatarSignedUrl"
            :alt="state.name"
            size="lg"
          />

          <UButton
            label="Choose"
            color="white"
            size="md"
            @click="onFileClick"
          />

          <input
            ref="fileRef"
            type="file"
            class="hidden"
            accept=".jpg, .jpeg, .png, .gif"
            @change="onFileChange"
          >
        </UFormGroup>
      </UDashboardSection>
    </UForm>

    <UDivider class="mb-4" />

    <UDashboardSection
      title="Account"
      description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
    >
      <div>
        <UButton
          color="red"
          label="Delete account"
          size="md"
          @click="isDeleteAccountModalOpen = true"
        />
      </div>
    </UDashboardSection>

    <!-- ~/components/Dashboard/settings/DeleteAccountModal.vue -->
    <DashboardSettingsDeleteAccountModal v-model="isDeleteAccountModalOpen" />
  </UDashboardPanelContent>
</template>
