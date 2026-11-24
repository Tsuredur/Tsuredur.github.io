<template>
  <a :href="link.href" target="_blank" rel="noopener" class="link">
    <span class="link__text">
      <span class="link__title">{{ link.title }}</span>
      <span class="link__subtitle mono">{{ link.subtitle }}</span>
    </span>
    <span class="link__go" aria-hidden="true">↗</span>
  </a>
</template>

<script setup>
defineProps({
  link: { type: Object, required: true }
})
</script>

<style scoped>
.link {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 12px 16px;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  transition: border-color 0.15s ease, transform 0.1s ease;
}

.link:hover {
  border-color: var(--gray-400);
}

.link:active {
  transform: scale(0.99);
}

.link__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.link__title {
  font-size: 0.92rem;
  font-weight: 600;
}

.link__subtitle {
  font-size: 0.72rem;
  color: var(--gray-400);
}

.link__go {
  color: var(--gray-400);
}

.link:hover .link__go {
  color: var(--orange);
}
</style>
