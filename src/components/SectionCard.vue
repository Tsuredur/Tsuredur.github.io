<template>
  <section class="card">
    <div class="card-head">
      <span v-if="index" class="step-index">{{ index }}</span>
      <h2>{{ title }}</h2>
    </div>
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  index: { type: String, default: '' } // e.g. '01' — omit for non-sequential cards
})
</script>
