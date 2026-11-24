<template>
  <ol class="timeline">
    <li
      v-for="(item, i) in items"
      :key="i"
      class="timeline__row"
      :class="{ 'timeline__row--divider': item.category === 'divider' }"
    >
      <span class="timeline__date mono">{{ item.date }}</span>
      <span class="timeline__rail">
        <span class="timeline__dot" :class="`timeline__dot--${item.category}`"></span>
        <span v-if="i !== items.length - 1" class="timeline__line"></span>
      </span>
      <span class="timeline__label">{{ tr(item.label) }}</span>
    </li>
  </ol>
</template>

<script setup>
import { tr } from '../i18n/index.js'

defineProps({
  items: { type: Array, required: true }
})
</script>

<style scoped>
.timeline {
  list-style: none;
}

.timeline__row {
  display: grid;
  grid-template-columns: 54px 18px 1fr;
  align-items: start;
}

.timeline__date {
  font-size: 0.78rem;
  color: var(--gray-400);
  padding-top: 3px;
}

.timeline__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.timeline__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--gray-300);
  margin-top: 6px;
  flex-shrink: 0;
}

.timeline__dot--achievement {
  background: var(--orange);
}

.timeline__dot--milestone {
  background: var(--green);
}

.timeline__line {
  width: 1px;
  flex: 1;
  background: var(--gray-100);
  margin: 4px 0;
}

.timeline__label {
  padding: 0 0 20px 8px;
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--gray-900);
}

.timeline__row--divider .timeline__label,
.timeline__row--divider .timeline__date {
  color: var(--gray-300);
}
</style>
