<template>
  <main class="page">
    <div class="page-stack">
      <section class="intro">
        <p class="eyebrow">{{ t('blog.eyebrow') }}</p>
        <h1 class="intro__title">{{ t('blog.title') }}</h1>
      </section>

      <section class="posts">
        <RouterLink v-for="post in posts" :key="post.slug" :to="`/blog/${post.slug}`" class="post">
          <div class="post__body">
            <div class="post__meta">
              <span class="post__date mono">{{ post.date }}</span>
              <TagPill v-for="(tag, j) in post.tags" :key="j" :label="tr(tag)" />
            </div>
            <h2 class="post__title">{{ tr(post.title) }}</h2>
            <p class="post__excerpt">{{ tr(post.excerpt) }}</p>
          </div>
        </RouterLink>
      </section>
    </div>
  </main>
</template>

<script setup>
import { t, tr } from '../i18n/index.js'
import TagPill from '../components/TagPill.vue'
import { posts } from '../data/posts.js'
</script>

<style scoped>
.intro__title {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.post {
  display: block;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--gray-100);
}

.post:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.post__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.post__date {
  font-size: 0.78rem;
  color: var(--gray-400);
}

.post__title {
  font-size: 1.15rem;
  margin-bottom: 8px;
  transition: color 0.15s ease;
}

.post:hover .post__title {
  color: var(--green-dark);
}

.post__excerpt {
  color: var(--gray-600);
  font-size: 0.92rem;
}

</style>
