<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4">
    <!-- Logo -->
    <div class="flex h-16 shrink-0 items-center">
      <div class="flex items-center gap-x-3">
        <div class="h-9 w-9 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="text-white text-lg font-semibold tracking-tight">Laravel Admin</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Menu</p>
          <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in navigation" :key="item.name">
              <RouterLink
                :to="item.to"
                :class="[
                  isActive(item.to)
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800',
                  'group flex gap-x-3 rounded-lg p-2.5 text-sm font-medium transition-all duration-150',
                ]"
              >
                <component :is="item.icon" class="h-5 w-5 shrink-0" />
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </li>

        <!-- Logout at bottom -->
        <li class="mt-auto">
          <div class="border-t border-slate-800 pt-4 mb-2">
            <button
              @click="handleLogout"
              class="group -mx-2 flex w-full gap-x-3 rounded-lg p-2.5 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
            >
              <ArrowRightOnRectangleIcon class="h-5 w-5 shrink-0" />
              Sign out
            </button>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const navigation = [
  { name: 'Dashboard', to: '/', icon: HomeIcon },
  { name: 'Profile', to: '/profile', icon: UserCircleIcon },
]

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

async function handleLogout(): Promise<void> {
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>
