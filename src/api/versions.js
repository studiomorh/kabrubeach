import { api } from './http.js'

export function listVersions(menu, language) {
  const params = new URLSearchParams({ menu, language })
  return api(`/api/versions?${params}`)
}

export function getVersion(id) {
  return api(`/api/versions/${id}`)
}

export function getCurrentVersion(menu, language) {
  const params = new URLSearchParams({ language })
  return api(`/api/menus/${menu}/current?${params}`)
}

export function saveVersion(menu, language, payload) {
  return api('/api/versions', {
    method: 'POST',
    body: JSON.stringify({ menu, language, payload }),
  })
}
