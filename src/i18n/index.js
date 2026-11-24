import { ref, watch } from 'vue'
import { messages } from './messages.js'

export const LOCALES = [
  { code: 'en', label: 'English', short: 'EN', htmlLang: 'en' },
  { code: 'zh', label: '中文', short: '中', htmlLang: 'zh-CN' },
  { code: 'ja', label: '日本語', short: '日', htmlLang: 'ja' }
]

const KEY = 'shikaru-locale'

function detect() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved && messages[saved]) return saved
  } catch (e) { /* storage unavailable */ }
  const nav = (navigator.language || 'en').toLowerCase()
  if (nav.startsWith('zh')) return 'zh'
  if (nav.startsWith('ja')) return 'ja'
  return 'en'
}

export const locale = ref(detect())

function apply(code) {
  const l = LOCALES.find(x => x.code === code)
  document.documentElement.lang = l ? l.htmlLang : 'en'
  try { localStorage.setItem(KEY, code) } catch (e) { /* ignore */ }
}
apply(locale.value)
watch(locale, apply)

export function setLocale(code) {
  if (messages[code]) locale.value = code
}

// UI string lookup: t('nav.home')
export function t(key, params) {
  let s = (messages[locale.value] && messages[locale.value][key]) ?? messages.en[key] ?? key
  if (params) for (const k in params) s = s.replace(`{${k}}`, params[k])
  return s
}

// data helper: L('English', '中文', '日本語')
export const L = (en, zh, ja) => ({ en, zh: zh ?? en, ja: ja ?? en })

// resolve a plain string or an {en, zh, ja} object
export function tr(v) {
  if (v == null || typeof v === 'string') return v
  return v[locale.value] ?? v.en
}

// localized country name from an ISO alpha-2 code (browser built-in), with fallback
export function countryName(code, fallback) {
  if (!code) return fallback
  try {
    const dn = new Intl.DisplayNames([locale.value === 'zh' ? 'zh-CN' : locale.value], { type: 'region' })
    return dn.of(code.toUpperCase()) || fallback
  } catch (e) {
    return fallback
  }
}
