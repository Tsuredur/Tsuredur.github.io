<template>
  <component
    :is="project.href ? (project.external ? 'a' : 'RouterLink') : 'div'"
    :href="project.external && project.href ? project.href : undefined"
    :to="!project.external && project.href ? project.href : undefined"
    :target="project.external && project.href ? '_blank' : undefined"
    :rel="project.external && project.href ? 'noopener' : undefined"
    class="proj"
    :class="{ 'proj--static': !project.href }"
  >
    <span class="proj__text">
      <span class="proj__title">{{ tr(project.title) }}</span>
      <span class="proj__tags">
        <TagPill v-for="(tag, i) in project.tags" :key="i" :label="tr(tag)" />
      </span>
    </span>
    <span v-if="project.href" class="proj__go" aria-hidden="true">{{ project.external ? '↗' : '→' }}</span>
  </component>
</template>

<script setup>
import { tr } from '../i18n/index.js'
import TagPill from './TagPill.vue'

defineProps({
  project: { type: Object, required: true }
})
</script>

<style scoped>
.proj {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 64px;
  padding: 14px 16px;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  background: var(--white);
  transition: border-color 0.15s ease, transform 0.1s ease;
}

.proj:hover {
  border-color: var(--gray-400);
}

.proj--static {
  cursor: default;
}

.proj--static:hover {
  border-color: var(--gray-200);
}

.proj--static:active {
  transform: none;
}

.proj:active {
  transform: scale(0.99);
}

.proj__text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.proj__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14.5px;
  line-height: 1.4;
}

.proj__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.proj__go {
  color: var(--gray-400);
  font-size: 16px;
  transition: color 0.15s ease;
}

.proj:hover .proj__go {
  color: var(--orange);
}
</style>
