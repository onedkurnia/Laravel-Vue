<template>
  <div
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
  >
    <!-- Mobile menu button -->
    <button
      type="button"
      class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      @click="$emit('openSidebar')"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-6 w-6" />
    </button>

    <!-- Separator -->
    <div class="h-6 w-px bg-gray-200 lg:hidden" />

    <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <!-- Page title -->
      <div class="flex flex-1 items-center">
        <h1 class="text-lg font-semibold text-gray-900">{{ pageTitle }}</h1>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-x-4 lg:gap-x-6">
        <!-- Notification bell -->
        <button
          type="button"
          class="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500 transition-colors"
        >
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" />
          <span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <!-- Separator -->
        <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

        <!-- Profile dropdown -->
        <Menu as="div" class="relative">
          <MenuButton class="-m-1.5 flex items-center p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            <div
              class="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-white shadow-sm"
            >
              <span class="text-xs font-semibold text-white">{{ userInitials }}</span>
            </div>
            <span class="hidden lg:flex lg:items-center">
              <span class="ml-3 text-sm font-semibold leading-6 text-gray-900">
                {{ authStore.user?.name || 'User' }}
              </span>
              <ChevronDownIcon class="ml-2 h-4 w-4 text-gray-400" />
            </span>
          </MenuButton>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-2.5 w-52 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            >
              <div class="px-3 py-2 border-b border-gray-100 mb-1">
                <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name }}</p>
                <p class="text-xs text-gray-500 truncate">{{ authStore.user?.email }}</p>
              </div>
              <MenuItem v-slot="{ active }">
                <RouterLink
                  to="/profile"
                  :class="[
                    active ? 'bg-gray-50' : '',
                    'flex items-center gap-x-2 px-3 py-2 text-sm text-gray-700',
                  ]"
                >
                  <UserCircleIcon class="h-4 w-4 text-gray-400" />
                  Your profile
                </RouterLink>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  @click="handleLogout"
                  :class="[
                    active ? 'bg-red-50' : '',
                    'flex w-full items-center gap-x-2 px-3 py-2 text-sm text-gray-700',
                  ]"
                >
                  <ArrowRightOnRectangleIcon class="h-4 w-4 text-gray-400" />
                  Sign out
                </button>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'

defineEmits<{
  openSidebar: []
}>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const pageTitle = computed(() => {
  switch (route.name) {
    case 'dashboard':
      return 'Dashboard'
    case 'profile':
      return 'Profile'
    default:
      return ''
  }
})

const userInitials = computed(() => {
  const name = authStore.user?.name || 'U'
  return name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

async function handleLogout(): Promise<void> {
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>
