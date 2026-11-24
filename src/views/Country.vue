<template>
  <main class="page">
    <div class="page-stack">
      <template v-if="entry">
        <section class="head">
          <RouterLink to="/map" class="back mono">&larr; {{ t('country.back') }}</RouterLink>
          <p class="eyebrow">{{ code.toUpperCase() }}</p>
          <h1 class="head__title">{{ name }}</h1>
          <p class="head__meta mono">{{ t('country.photos', { n: entry.photos.length }) }} · {{ t('country.hint') }}</p>
        </section>

        <section class="stage">
          <FloatingGallery :photos="entry.photos" :seed="code" @open="active = $event" />
        </section>

        <PhotoLightbox v-if="active !== null" v-model:index="active" :photos="entry.photos" @close="active = null" />
      </template>

      <section v-else class="card">
        <p>{{ t('country.notfound') }}</p>
        <RouterLink to="/map" class="back mono">&larr; {{ t('country.back') }}</RouterLink>
      </section>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import FloatingGallery from '../components/FloatingGallery.vue'
import PhotoLightbox from '../components/PhotoLightbox.vue'
import { t, countryName } from '../i18n/index.js'
import { travel } from '../data/travel.js'

const props = defineProps({
  code: { type: String, required: true }
})

const entry = computed(() => travel[props.code.toLowerCase()])
const name = computed(() => countryName(props.code, props.code.toUpperCase()))
const active = ref(null)
</script>

<style scoped>
.back {
  display: inline-block;
  color: var(--gray-400);
  font-size: 0.82rem;
  margin-bottom: 18px;
}

.back:hover {
  color: var(--orange);
}

.head__title {
  font-size: 1.9rem;
  margin-bottom: 8px;
}

.head__meta {
  font-size: 12px;
  color: var(--gray-400);
}

.stage {
  border: 1px dashed var(--gray-200);
  border-radius: 14px;
  background: var(--gray-50);
  overflow: hidden;
}
</style>
