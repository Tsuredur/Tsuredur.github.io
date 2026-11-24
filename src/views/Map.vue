<template>
  <main class="page">
    <div class="page-stack">
      <section class="intro">
        <p class="eyebrow">{{ t('map.eyebrow') }}</p>
        <h1 class="intro__title">{{ t('map.title') }}</h1>
        <p class="intro__desc">{{ t('map.desc') }}</p>
      </section>

      <section class="card">
        <WorldMap :visited="visited" @open="goCountry" />
      </section>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import WorldMap from '../components/WorldMap.vue'
import { t } from '../i18n/index.js'
import { travel } from '../data/travel.js'

const router = useRouter()
const visited = Object.keys(travel)

function goCountry(code) {
  router.push(`/map/${code}`)
}
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

.card {
  padding: 14px;
}

@media (max-width: 640px) {
  .card {
    padding: 10px;
  }
}
</style>
