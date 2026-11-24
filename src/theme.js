import { ref, watch } from 'vue'

const KEY = 'shikaru-theme'

function detect() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch (e) { /* storage unavailable */ }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const theme = ref(detect())

function apply(v) {
  document.documentElement.setAttribute('data-theme', v)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', v === 'dark' ? '#14161b' : '#ffffff')
  try { localStorage.setItem(KEY, v) } catch (e) { /* ignore */ }
}
apply(theme.value)
watch(theme, apply)

export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
