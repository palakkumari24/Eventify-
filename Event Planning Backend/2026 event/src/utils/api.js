export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, opts)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json()
}
