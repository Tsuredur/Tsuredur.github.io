<template>
  <main class="page">
    <div class="page-stack">
      <section class="intro">
        <p class="eyebrow">{{ t('project.eyebrow') }}</p>
        <h1 class="intro__title">{{ t('project.title') }}</h1>
        <p class="intro__desc">{{ t('project.desc') }}</p>
      </section>

      <SectionCard :title="t('project.publications')" index="01">
        <ol class="pub-list">
          <li v-for="(p, i) in publications" :key="i">
            <span class="pub-index mono">[{{ i + 1 }}]</span>
            <div>
              <p class="pub-authors">{{ p.authors }}</p>
              <p class="pub-title">&ldquo;{{ p.title }}&rdquo;</p>
              <p class="pub-venue">{{ p.venue }}, {{ p.year }}.</p>
            </div>
          </li>
        </ol>
      </SectionCard>

      <SectionCard :title="t('project.projects')" index="02">
        <div class="grid">
          <ProjectCard v-for="(p, i) in projects" :key="p.slug" :project="p" :tone="i % 2 === 0 ? 'green' : 'orange'" />
        </div>
      </SectionCard>
    </div>
  </main>
</template>

<script setup>
import { t } from '../i18n/index.js'
import SectionCard from '../components/SectionCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { publications, projects } from '../data/profile.js'
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

.pub-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.pub-list li {
  display: flex;
  gap: 14px;
  border-top: 1px solid var(--gray-100);
  padding-top: 16px;
}

.pub-list li:first-child {
  border-top: none;
  padding-top: 0;
}

.pub-index {
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--orange);
  padding-top: 2px;
}

.pub-authors {
  font-size: 13px;
  color: var(--gray-600);
  margin-bottom: 4px;
}

.pub-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-900);
  line-height: 1.5;
  margin-bottom: 4px;
}

.pub-venue {
  font-size: 12.5px;
  font-style: italic;
  color: var(--gray-600);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}
</style>
