<template>
  <div class="min-h-screen flex">
    <!-- Left side - branding panel -->
    <div
      class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 p-12 flex-col justify-between relative overflow-hidden"
    >
      <!-- Decorative circles -->
      <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/5" />
      <div class="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-white/5" />
      <div class="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-white/5" />

      <div class="relative">
        <div class="flex items-center gap-x-3">
          <div class="h-11 w-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="text-white text-2xl font-bold tracking-tight">Laravel Admin</span>
        </div>
      </div>

      <div class="relative">
        <h1 class="text-5xl font-bold text-white leading-tight mb-6">
          Welcome to your<br />Admin Dashboard
        </h1>
        <p class="text-indigo-200 text-lg max-w-md leading-relaxed">
          Manage your application with a powerful and intuitive interface designed for
          productivity.
        </p>
      </div>

      <div class="relative text-indigo-300 text-sm">
        &copy; {{ currentYear }} Laravel Admin. All rights reserved.
      </div>
    </div>

    <!-- Right side - login form -->
    <div class="flex-1 flex items-center justify-center p-8 bg-gray-50">
      <div class="w-full max-w-md">
        <!-- Mobile logo -->
        <div class="lg:hidden flex items-center gap-x-3 mb-10">
          <div class="h-11 w-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="text-gray-900 text-2xl font-bold tracking-tight">Laravel Admin</span>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
        <p class="text-gray-500 mb-8">Enter your credentials to access the dashboard</p>

        <!-- Error message -->
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <div
            v-if="authStore.error"
            class="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-x-3"
          >
            <ExclamationCircleIcon class="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
            <p class="text-sm font-medium text-red-800 flex-1">{{ authStore.error }}</p>
            <button
              @click="authStore.clearError"
              class="text-red-400 hover:text-red-600 transition-colors"
            >
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
        </Transition>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">
              Email address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              placeholder="you@example.com"
              class="block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="Enter your password"
              class="block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:shadow-indigo-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <span v-if="authStore.loading" class="flex items-center justify-center gap-x-2">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                  fill="none"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Signing in...
            </span>
            <span v-else>Sign in</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const currentYear = computed(() => new Date().getFullYear())

async function handleLogin(): Promise<void> {
  const success = await authStore.login(email.value, password.value)
  if (success) {
    router.push({ name: 'dashboard' })
  }
}
</script>
