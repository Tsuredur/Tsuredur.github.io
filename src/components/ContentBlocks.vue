<template>
  <div class="blocks">
    <template v-for="(block, i) in blocks" :key="i">
      <h2 v-if="block.type === 'heading'" class="blocks__heading">{{ tr(block.text) }}</h2>

      <p v-else-if="block.type === 'paragraph'" class="blocks__paragraph">{{ tr(block.text) }}</p>

      <ol v-else-if="block.type === 'list' && block.ordered" class="blocks__list mono">
        <li v-for="(item, j) in block.items" :key="j">{{ tr(item) }}</li>
      </ol>
      <ul v-else-if="block.type === 'list'" class="blocks__list">
        <li v-for="(item, j) in block.items" :key="j">{{ tr(item) }}</li>
      </ul>

      <figure v-else-if="block.type === 'figure'" class="blocks__figure">
        <img :src="block.src" :alt="tr(block.caption)" loading="lazy" />
        <figcaption class="mono">{{ tr(block.caption) }}</figcaption>
      </figure>

      <div v-else-if="block.type === 'figureGrid'" class="blocks__grid">
        <figure v-for="(fig, j) in block.items" :key="j">
          <img :src="fig.src" :alt="tr(fig.caption)" loading="lazy" />
          <figcaption class="mono">{{ tr(fig.caption) }}</figcaption>
        </figure>
      </div>
    </template>
  </div>
</template>

<script setup>
import { tr } from '../i18n/index.js'

defineProps({
  blocks: { type: Array, required: true }
})
</script>

<style scoped>
.blocks {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.blocks__heading {
  font-size: 1.15rem;
  margin-top: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--gray-100);
}

.blocks__paragraph {
  color: var(--gray-600);
  font-size: 0.98rem;
}

.blocks__list {
  padding-left: 22px;
  color: var(--gray-600);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.blocks__list.mono {
  font-size: 0.92rem;
}

.blocks__figure img {
  border-radius: 8px;
  border: 1px solid var(--gray-200);
}

.blocks__figure figcaption {
  margin-top: 8px;
  font-size: 0.76rem;
  color: var(--gray-400);
  text-align: center;
}

.blocks__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.blocks__grid figcaption {
  margin-top: 8px;
  font-size: 0.76rem;
  color: var(--gray-400);
  text-align: center;
}

.blocks__grid img {
  border-radius: 8px;
  border: 1px solid var(--gray-200);
}
</style>
