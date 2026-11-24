<template>
  <main class="page">
    <div class="page-stack">
      <section class="hero">
        <div class="hero__avatar">
          <img :src="profile.avatar" :alt="profile.displayName" @error="avatarError = true" v-show="!avatarError" />
          <PlaceholderImage v-if="avatarError" tone="green" />
        </div>
        <p class="hero__scripts mono">{{ profile.nameScripts }}</p>
        <h1 class="hero__name">{{ profile.displayName }}</h1>
        <p class="hero__tagline">{{ t('home.tagline') }}</p>
      </section>

      <nav class="hub">
        <RouterLink v-for="(h, i) in hubs" :key="h.to" :to="h.to" class="hub__item">
          <span class="step-index">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="hub__text">
            <span class="hub__title">{{ t(`home.hub.${h.id}.t`) }}</span>
            <span class="hub__desc">{{ t(`home.hub.${h.id}.d`) }}</span>
          </span>
          <span class="hub__arrow" aria-hidden="true">→</span>
        </RouterLink>
      </nav>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import PlaceholderImage from '../components/PlaceholderImage.vue'
import { t } from '../i18n/index.js'
import { profile } from '../data/profile.js'

const avatarError = ref(false)

const hubs = [
  { id: 'intro', to: '/intro' },
  { id: 'map', to: '/map' },
  { id: 'project', to: '/project' },
  { id: 'blog', to: '/blog' },
  { id: 'about', to: '/about' }
]
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 28px 0 12px;
}

.hero__avatar {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--gray-200);
  background: var(--green-soft);
  margin-bottom: 18px;
}

.hero__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__avatar :deep(.placeholder) {
  aspect-ratio: auto;
  height: 100%;
  border: none;
  border-radius: 0;
}

.hero__scripts {
  font-size: 13px;
  color: var(--gray-600);
  margin-bottom: 8px;
}

.hero__name {
  font-size: clamp(2rem, 7vw, 2.8rem);
  margin-bottom: 14px;
}

.hero__tagline {
  max-width: 460px;
  font-size: 0.95rem;
  color: var(--gray-600);
}

.hub {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.hub__item {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 76px;
  padding: 16px 18px;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 14px;
  transition: border-color 0.15s ease, transform 0.1s ease;
}

.hub__item:hover {
  border-color: var(--gray-400);
}

.hub__item:active {
  transform: scale(0.98);
}

.hub__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.hub__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
}

.hub__desc {
  font-size: 12.5px;
  color: var(--gray-600);
  line-height: 1.5;
}

.hub__arrow {
  color: var(--gray-400);
  transition: color 0.15s ease, transform 0.15s ease;
}

.hub__item:hover .hub__arrow {
  color: var(--orange);
  transform: translateX(2px);
}

@media (max-width: 640px) {
  .hub {
    grid-template-columns: 1fr;
  }
}
</style>
