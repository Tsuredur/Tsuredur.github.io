<template>
  <main class="page" v-if="report">
    <div class="page-stack">
      <article class="card">
        <RouterLink to="/" class="back mono">&larr; {{ t('nav.intro') }}</RouterLink>
        <p class="eyebrow">{{ report.subtitle }}</p>
        <h1 class="title">{{ report.title }}</h1>
        <div class="tags">
          <TagPill v-for="t in report.tags" :key="t" :label="t" />
        </div>
        <ContentBlocks :blocks="report.blocks" />
      </article>
    </div>
  </main>
  <main class="page" v-else>
    <div class="page-stack">
      <section class="card">
        <p>{{ t('project.notfound') }}</p>
        <RouterLink to="/" class="back mono">&larr; {{ t('nav.intro') }}</RouterLink>
      </section>
    </div>
  </main>
</template>

<script setup>
import { t } from '../i18n/index.js'
import { computed } from 'vue'
import TagPill from '../components/TagPill.vue'
import ContentBlocks from '../components/ContentBlocks.vue'
import { projectReports } from '../data/projectReports.js'

const props = defineProps({
  slug: { type: String, required: true }
})

const report = computed(() => projectReports[props.slug])
</script>

<style scoped>
.back {
  display: inline-block;
  color: var(--gray-400);
  font-size: 0.82rem;
  margin-bottom: 22px;
}

.back:hover {
  color: var(--green-dark);
}

.title {
  font-size: 1.7rem;
  margin-bottom: 16px;
}

.tags {
  display: flex;
  gap: 8px;
  margin-bottom: 28px;
}
</style>
