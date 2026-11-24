<template>
  <header class="nav">
    <div class="nav__inner page">
      <RouterLink to="/" class="nav__brand">SHIKARU</RouterLink>

      <div class="nav__tools">
        <button
          type="button"
          class="nav__btn"
          :aria-label="theme === 'dark' ? t('ui.theme.light') : t('ui.theme.dark')"
          :title="theme === 'dark' ? t('ui.theme.light') : t('ui.theme.dark')"
          @click="toggleTheme"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
            <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
          </svg>
        </button>

        <div class="lang" ref="langRoot">
          <button
            type="button"
            class="nav__btn lang__btn"
            :aria-label="t('ui.language')"
            aria-haspopup="menu"
            :aria-expanded="langOpen"
            @click="langOpen = !langOpen"
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
              <circle cx="12" cy="12" r="8.5" />
              <path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17" />
            </svg>
            <span class="mono lang__code">{{ current.short }}</span>
          </button>
          <ul v-if="langOpen" class="lang__menu" role="menu">
            <li v-for="l in LOCALES" :key="l.code" role="none">
              <button
                type="button"
                role="menuitemradio"
                :aria-checked="l.code === locale"
                class="lang__item"
                :class="{ 'is-current': l.code === locale }"
                @click="choose(l.code)"
              >
                {{ l.label }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <nav class="nav__links">
        <RouterLink v-for="item in items" :key="item.to" :to="item.to" class="nav__link" :class="{ 'is-active': item.active }">
          {{ t(item.key) }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { t, locale, setLocale, LOCALES } from '../i18n/index.js'
import { theme, toggleTheme } from '../theme.js'

const route = useRoute()

const items = computed(() => {
  const p = route.path
  return [
    { to: '/', key: 'nav.intro', active: p === '/' || p.startsWith('/project') },
    { to: '/map', key: 'nav.map', active: p.startsWith('/map') },
    { to: '/blog', key: 'nav.blog', active: p.startsWith('/blog') }
  ]
})

const current = computed(() => LOCALES.find(l => l.code === locale.value) || LOCALES[0])

const langOpen = ref(false)
const langRoot = ref(null)

function choose(code) {
  setLocale(code)
  langOpen.value = false
}

function onDocClick(e) {
  if (langOpen.value && langRoot.value && !langRoot.value.contains(e.target)) langOpen.value = false
}
function onKey(e) {
  if (e.key === 'Escape') langOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--nav-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--gray-100);
}

.nav__inner {
  min-height: var(--nav-height);
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav__brand {
  flex-shrink: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.nav__links {
  order: 2;
  display: flex;
  align-items: center;
  gap: 18px;
  flex: 1;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.nav__links::-webkit-scrollbar {
  display: none;
}

.nav__link {
  flex-shrink: 0;
  white-space: nowrap;
  color: var(--gray-600);
  padding: 10px 1px;
  position: relative;
}

.nav__link.is-active {
  color: var(--gray-900);
}

.nav__link.is-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  height: 2px;
  background: var(--green);
}

.nav__tools {
  order: 3;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.nav__btn {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  min-width: 40px;
  padding: 0 10px;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--gray-600);
  font-family: inherit;
  transition: color 0.15s ease, background 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.nav__btn:hover {
  color: var(--orange);
}

.nav__btn:active {
  background: var(--gray-50);
}

.lang {
  position: relative;
}

.lang__code {
  font-size: 12px;
}

.lang__menu {
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  list-style: none;
  min-width: 132px;
  padding: 6px;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 30;
}

.lang__item {
  width: 100%;
  min-height: 40px;
  text-align: left;
  padding: 0 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--gray-900);
  font-family: inherit;
  font-size: 14px;
}

.lang__item:hover {
  background: var(--gray-50);
}

.lang__item.is-current {
  color: var(--green-dark);
  font-weight: 600;
}

/* phones: keep one compact row */
@media (max-width: 700px) {
  .nav__inner {
    gap: 10px;
  }

  .nav__brand {
    font-size: 0.95rem;
  }

  .nav__links {
    gap: 12px;
    font-size: 0.8rem;
  }

  .nav__btn {
    min-width: 36px;
    padding: 0 6px;
  }
}
</style>
