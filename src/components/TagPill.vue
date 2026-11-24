<template>
  <span class="tag" :class="variant !== 'neutral' ? `tag--${variant}` : ''">{{ label }}</span>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  variant: { type: String, default: 'neutral' } // 'neutral' | 'green' | 'orange'
})
</script>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--gray-900);
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  padding: 6px 12px;
  border-radius: 999px;
  line-height: 1;
  white-space: nowrap;
}

.tag--green {
  color: var(--green-dark);
  background: var(--green-soft);
  border-color: var(--green-border);
}

.tag--orange {
  color: var(--orange-dark);
  background: var(--orange-soft);
  border-color: var(--orange-border);
}
</style>
