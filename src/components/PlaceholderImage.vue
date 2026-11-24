<template>
  <div class="placeholder" :class="`placeholder--${tone}`">
    <span class="placeholder__label mono">image</span>
  </div>
</template>

<script setup>
defineProps({
  tone: { type: String, default: 'green' } // 'green' | 'orange'
})
</script>

<style scoped>
.placeholder {
  aspect-ratio: 16 / 10;
  border-radius: 8px;
  border: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  background: repeating-linear-gradient(
    135deg,
    var(--gray-50),
    var(--gray-50) 10px,
    var(--white) 10px,
    var(--white) 20px
  );
}

.placeholder__label {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid var(--gray-200);
  background: var(--white);
  color: var(--gray-400);
}

.placeholder--green .placeholder__label {
  color: var(--green-dark);
  border-color: var(--green-border);
}

.placeholder--orange .placeholder__label {
  color: var(--orange-dark);
  border-color: var(--orange-border);
}
</style>
