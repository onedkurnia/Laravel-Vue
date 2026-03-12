import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import type { User, ApiResponse, LoginResponse } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.post<ApiResponse<LoginResponse>>('/auth/login', {
        email,
        password,
      })
      token.value = data.data.token
      localStorage.setItem('token', data.data.token)
      await fetchUser()
      return true
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } }
      error.value = axiosError.response?.data?.message || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function fetchUser(): Promise<void> {
    try {
      const { data } = await api.get<ApiResponse<User>>('/auth/me')
      user.value = data.data
    } catch {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
    }
  }

  async function logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } catch {
      // Ignore - logging out regardless
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
    }
  }

  function clearError(): void {
    error.value = null
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    fetchUser,
    logout,
    clearError,
  }
})
