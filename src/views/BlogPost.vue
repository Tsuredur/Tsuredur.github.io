<template>
  <main class="page" v-if="post">
    <div class="page-stack">
      <article class="card">
        <RouterLink to="/blog" class="back mono">&larr; {{ t('blog.back') }}</RouterLink>
        <p class="eyebrow">{{ post.date }}</p>
        <h1 class="title">{{ tr(post.title) }}</h1>
        <div class="tags">
          <TagPill v-for="(tag, j) in post.tags" :key="j" :label="tr(tag)" />
        </div>
        <ContentBlocks :blocks="post.blocks" />
      </article>
    </div>
  </main>
  <main class="page" v-else>
    <div class="page-stack">
      <section class="card">
        <p>{{ t('blog.notfound') }}</p>
        <RouterLink to="/blog" class="back mono">&larr; {{ t('blog.back') }}</RouterLink>
      </section>
    </div>
  </main>
</template>

<script setup>
import { t, tr } from '../i18n/index.js'
import { computed } from 'vue'
import TagPill from '../components/TagPill.vue'
import ContentBlocks from '../components/ContentBlocks.vue'
import { posts } from '../data/posts.js'

const props = defineProps({
  slug: { type: String, required: true }
})

const post = computed(() => posts.find(p => p.slug === props.slug))
</script>

<style scoped>
.back {
  display: inline-block;
  color: var(--gray-400);
  font-size: 0.82rem;
  margin-bottom: 22px;
}

.back:hover {
  color: var(--orange);
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
