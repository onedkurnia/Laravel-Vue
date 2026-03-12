<template>
  <div class="max-w-3xl">
    <!-- Profile Header Card -->
    <div class="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden mb-8">
      <!-- Cover gradient -->
      <div class="h-36 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 relative">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      </div>

      <div class="px-6 pb-6">
        <div class="-mt-14 flex items-end gap-x-6">
          <!-- Avatar -->
          <div class="h-28 w-28 rounded-2xl bg-white p-1.5 shadow-xl">
            <div
              class="h-full w-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
            >
              <span class="text-3xl font-bold text-white">{{ userInitials }}</span>
            </div>
          </div>

          <!-- Name & email -->
          <div class="pb-2">
            <h2 class="text-xl font-bold text-gray-900">{{ authStore.user?.name }}</h2>
            <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Details Card -->
    <div class="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
      <div class="px-6 py-5 border-b border-gray-100">
        <h3 class="text-base font-semibold text-gray-900">Profile Information</h3>
        <p class="text-sm text-gray-500 mt-1">Your account details and personal information.</p>
      </div>
      <div class="px-6 py-2">
        <dl class="divide-y divide-gray-100">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-500">Full name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ authStore.user?.name || '\u2014' }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ authStore.user?.email || '\u2014' }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-500">Email verified</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0">
              <span
                :class="[
                  authStore.user?.email_verified_at
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700',
                  'inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                ]"
              >
                <span
                  :class="[
                    authStore.user?.email_verified_at ? 'bg-emerald-500' : 'bg-amber-500',
                    'h-1.5 w-1.5 rounded-full',
                  ]"
                />
                {{ authStore.user?.email_verified_at ? 'Verified' : 'Not verified' }}
              </span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-500">Member since</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ formatDate(authStore.user?.created_at) }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-500">Last updated</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ formatDate(authStore.user?.updated_at) }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const userInitials = computed(() => {
  const name = authStore.user?.name || 'U'
  return name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

function formatDate(dateString?: string | null): string {
  if (!dateString) return '\u2014'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
