<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="text-center">
      <p class="text-8xl font-extrabold text-indigo-600 tracking-tight">404</p>
      <h1 class="mt-4 text-3xl font-bold text-gray-900">Page not found</h1>
      <p class="mt-3 text-base text-gray-500 max-w-md mx-auto">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <div class="mt-8">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-x-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
        >
          <ArrowLeftIcon class="h-4 w-4" />
          Back to dashboard
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
</script>
