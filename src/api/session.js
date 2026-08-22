import { ref } from 'vue'
import { api, ApiError } from './http.js'

export const currentUser = ref(null)

export async function login(username, password) {
  const data = await api('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  currentUser.value = data.user
  return data.user
}

export async function logout() {
  try {
    await api('/api/logout', { method: 'POST' })
  } finally {
    currentUser.value = null
  }
}

export async function loadSession() {
  try {
    const data = await api('/api/me')
    currentUser.value = data.user
    return data.user
  } catch (error) {
    currentUser.value = null
    if (error instanceof ApiError && error.status === 401) return null
    throw error
  }
}
