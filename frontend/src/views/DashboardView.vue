<template>
  <div>
    <!-- Welcome section -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">
        Welcome back, {{ authStore.user?.name?.split(' ')[0] || 'User' }}
      </h2>
      <p class="mt-1 text-sm text-gray-500">
        Here's what's happening with your application today.
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.name"
        class="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-x-4">
          <div :class="[stat.bgColor, 'rounded-xl p-3 shadow-lg']" :style="{ boxShadow: stat.shadow }">
            <component :is="stat.icon" class="h-6 w-6 text-white" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">{{ stat.name }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
          </div>
        </div>
        <div class="mt-4 flex items-center text-sm">
          <span
            :class="[
              stat.changeType === 'increase' ? 'text-emerald-600' : 'text-red-600',
              'font-semibold',
            ]"
          >
            <span v-if="stat.changeType === 'increase'">&#8593;</span>
            <span v-else>&#8595;</span>
            {{ stat.change }}
          </span>
          <span class="ml-2 text-gray-500">from last month</span>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Activity -->
      <div class="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="text-base font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div class="divide-y divide-gray-100">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="px-6 py-4 flex items-center gap-x-4 hover:bg-gray-50/50 transition-colors"
          >
            <div :class="[activity.iconBg, 'rounded-lg p-2 shadow-sm']">
              <component :is="activity.icon" class="h-4 w-4 text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-xs text-gray-500 mt-0.5">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- System Overview -->
      <div class="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="text-base font-semibold text-gray-900">System Overview</h3>
        </div>
        <div class="p-6">
          <dl class="space-y-4">
            <div
              v-for="info in systemInfo"
              :key="info.label"
              class="flex items-center justify-between py-1"
            >
              <dt class="text-sm text-gray-500">{{ info.label }}</dt>
              <dd>
                <span
                  :class="[
                    info.statusColor,
                    'inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                  ]"
                >
                  <span
                    :class="[info.dotColor, 'h-1.5 w-1.5 rounded-full']"
                  />
                  {{ info.value }}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import {
  UsersIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  ServerIcon,
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const stats = [
  {
    name: 'Total Users',
    value: '2,340',
    change: '12.5%',
    changeType: 'increase',
    icon: markRaw(UsersIcon),
    bgColor: 'bg-indigo-600',
    shadow: '0 4px 14px 0 rgba(79, 70, 229, 0.4)',
  },
  {
    name: 'Sessions',
    value: '1,210',
    change: '8.2%',
    changeType: 'increase',
    icon: markRaw(CursorArrowRaysIcon),
    bgColor: 'bg-purple-600',
    shadow: '0 4px 14px 0 rgba(147, 51, 234, 0.4)',
  },
  {
    name: 'Revenue',
    value: '$12,400',
    change: '3.1%',
    changeType: 'decrease',
    icon: markRaw(ChartBarIcon),
    bgColor: 'bg-emerald-600',
    shadow: '0 4px 14px 0 rgba(5, 150, 105, 0.4)',
  },
  {
    name: 'Messages',
    value: '642',
    change: '24.3%',
    changeType: 'increase',
    icon: markRaw(EnvelopeOpenIcon),
    bgColor: 'bg-amber-500',
    shadow: '0 4px 14px 0 rgba(245, 158, 11, 0.4)',
  },
]

const recentActivity = [
  {
    id: 1,
    title: 'New user registered',
    time: '5 minutes ago',
    icon: markRaw(UserPlusIcon),
    iconBg: 'bg-indigo-500',
  },
  {
    id: 2,
    title: 'System security scan completed',
    time: '1 hour ago',
    icon: markRaw(ShieldCheckIcon),
    iconBg: 'bg-emerald-500',
  },
  {
    id: 3,
    title: 'Server maintenance scheduled',
    time: '3 hours ago',
    icon: markRaw(ServerIcon),
    iconBg: 'bg-amber-500',
  },
  {
    id: 4,
    title: '15 new users signed up',
    time: 'Yesterday',
    icon: markRaw(UsersIcon),
    iconBg: 'bg-purple-500',
  },
]

const systemInfo = [
  { label: 'API Status', value: 'Operational', statusColor: 'bg-emerald-50 text-emerald-700', dotColor: 'bg-emerald-500' },
  { label: 'Database', value: 'Connected', statusColor: 'bg-emerald-50 text-emerald-700', dotColor: 'bg-emerald-500' },
  { label: 'Cache', value: 'Active', statusColor: 'bg-emerald-50 text-emerald-700', dotColor: 'bg-emerald-500' },
  { label: 'Queue', value: 'Running', statusColor: 'bg-emerald-50 text-emerald-700', dotColor: 'bg-emerald-500' },
  { label: 'Storage', value: '45% Used', statusColor: 'bg-amber-50 text-amber-700', dotColor: 'bg-amber-500' },
  { label: 'Last Deploy', value: 'Today', statusColor: 'bg-blue-50 text-blue-700', dotColor: 'bg-blue-500' },
]
</script>
