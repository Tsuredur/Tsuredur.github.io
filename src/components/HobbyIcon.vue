<template>
  <svg class="hobby-icon" viewBox="0 0 24 24" fill="none">
    <template v-if="icon === 'football'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7 15 9.2 13.8 13H10.2L9 9.2 12 7Z" stroke-linejoin="round" />
    </template>
    <template v-else-if="icon === 'fitness'">
      <path d="M4 12h16" stroke-linecap="round" />
      <rect x="2.3" y="9.3" width="3" height="5.4" rx="1" />
      <rect x="18.7" y="9.3" width="3" height="5.4" rx="1" />
      <rect x="6.3" y="10.3" width="2" height="3.4" rx="0.6" />
      <rect x="15.7" y="10.3" width="2" height="3.4" rx="0.6" />
    </template>
    <template v-else-if="icon === 'mountain'">
      <path d="M3 19 9 8l3 5 2-3 7 9H3Z" stroke-linejoin="round" />
      <path d="M9 8V4.5M9 4.5l3 1.2-3 1.3" stroke-linejoin="round" />
    </template>
    <template v-else-if="icon === 'hiking'">
      <ellipse cx="8" cy="7" rx="2" ry="3" transform="rotate(-15 8 7)" />
      <ellipse cx="15.5" cy="12" rx="2" ry="3" transform="rotate(15 15.5 12)" />
      <ellipse cx="8" cy="17" rx="2" ry="3" transform="rotate(-15 8 17)" />
    </template>
    <template v-else-if="icon === 'language'">
      <path d="M4 5h11v8H9l-3 3v-3H4V5Z" stroke-linejoin="round" />
      <path d="M20 9v7h-3v3l-3-3h-2" stroke-linejoin="round" />
    </template>
    <template v-else-if="icon === 'exchange'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17" stroke-linecap="round" />
    </template>
    <template v-else>
      <path d="M20 4 3 11l6 2 2 6 2-4 4 3 3-14Z" stroke-linejoin="round" />
      <path d="M9 13l3-3" stroke-linecap="round" />
    </template>
  </svg>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true }
})
</script>

<style scoped>
.hobby-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  stroke: var(--green);
  stroke-width: 1.7;
}
</style>
