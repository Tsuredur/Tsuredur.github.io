<template>
  <main class="page">
    <div class="page-stack">
      <section class="intro">
        <p class="eyebrow">{{ t('about.eyebrow') }}</p>
        <h1 class="intro__title">{{ t('about.title') }}</h1>
        <p class="intro__desc">{{ t('about.desc') }}</p>
      </section>

      <SectionCard :title="t('about.labs')" index="01">
        <div class="links">
          <LinkCard v-for="l in affiliations" :key="l.title" :link="l" />
        </div>
      </SectionCard>

      <SectionCard :title="t('about.album')" index="02">
        <p class="album-note mono">{{ t('about.albumNote') }}</p>
        <div class="album-grid">
          <figure v-for="(a, i) in album" :key="i" class="album-item">
            <PlaceholderImage v-if="a.placeholder" :tone="a.tone" />
            <img v-else :src="a.src" :alt="a.caption || 'Album photo'" />
          </figure>
        </div>
      </SectionCard>
    </div>
  </main>
</template>

<script setup>
import { t } from '../i18n/index.js'
import SectionCard from '../components/SectionCard.vue'
import LinkCard from '../components/LinkCard.vue'
import PlaceholderImage from '../components/PlaceholderImage.vue'
import { affiliations, album } from '../data/profile.js'
</script>

<style scoped>
.intro__title {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.intro__desc {
  color: var(--gray-600);
  font-size: 0.92rem;
}

.links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.album-note {
  font-size: 12px;
  color: var(--gray-400);
  margin-bottom: 14px;
}

.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.album-item {
  margin: 0;
}

.album-item img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--gray-200);
}

.album-item :deep(.placeholder) {
  aspect-ratio: 1;
  border-radius: 8px;
}
</style>
