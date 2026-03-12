export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message: string
}

export interface LoginResponse {
  token: string
  expires_at: string | null
}
