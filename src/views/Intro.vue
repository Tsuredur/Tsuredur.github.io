<template>
  <main class="page page--wide">
    <div class="layout">
      <div class="layout__main page-stack">
        <!-- profile -->
        <section class="card profile-card">
          <div class="profile-head">
            <img class="avatar" :src="profile.avatar" :alt="profile.displayName" width="96" height="96" />
            <div class="profile-id">
              <p class="eyebrow">{{ t('intro.eyebrow') }}</p>
              <h1>{{ profile.displayName }}</h1>
              <p class="name-scripts mono">{{ profile.nameScripts }}</p>
            </div>
          </div>
          <div class="bio">
            <p v-for="(paragraph, i) in tr(profile.bio).split('\n\n')" :key="i">{{ paragraph }}</p>
          </div>
        </section>

        <div class="two-col">
          <SectionCard :title="t('intro.research')" index="01">
            <div class="tag-list">
              <TagPill v-for="(tag, i) in researchTags" :key="i" :label="tr(tag)" />
            </div>
          </SectionCard>

          <SectionCard :title="t('intro.tech')" index="02">
            <div class="tag-list">
              <TagPill v-for="tag in techTags" :key="tag" :label="tag" />
            </div>
          </SectionCard>
        </div>

        <SectionCard :title="t('intro.publications')" index="03">
          <ol class="pub-list">
            <li v-for="(p, i) in publications" :key="i">
              <span class="pub-index mono">[{{ i + 1 }}]</span>
              <div>
                <p class="pub-authors">{{ p.authors }}</p>
                <p class="pub-title">&ldquo;{{ p.title }}&rdquo;</p>
                <p class="pub-venue">{{ p.venue }}, {{ p.year }}.</p>
                <p v-if="p.pdf || p.code" class="pub-links mono">
                  <a v-if="p.pdf" :href="p.pdf" target="_blank" rel="noopener" class="pub-link">PDF ↗</a>
                  <a v-if="p.code" :href="p.code" target="_blank" rel="noopener" class="pub-link">Code ↗</a>
                </p>
              </div>
            </li>
          </ol>
        </SectionCard>

        <SectionCard :title="t('intro.languages')" index="04">
          <div class="tag-list language-tags">
            <TagPill v-for="(language, i) in languages" :key="i" :label="tr(language)" />
          </div>
        </SectionCard>

        <SectionCard :title="t('intro.projects')" index="05">
          <div class="stack">
            <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
          </div>
        </SectionCard>

        <SectionCard :title="t('intro.labs')" index="06">
          <div class="labs">
            <LinkCard v-for="l in affiliations" :key="l.title" :link="l" />
          </div>
        </SectionCard>

        <SectionCard :title="t('intro.beyond')" index="07">
          <ul class="hobby-grid">
            <li v-for="h in hobbies" :key="h.icon" class="hobby">
              <HobbyIcon :icon="h.icon" />
              <span>{{ tr(h.label) }}</span>
            </li>
          </ul>
        </SectionCard>
      </div>

      <!-- desktop: timeline stays beside the content while scrolling -->
      <aside class="layout__aside" :aria-label="t('intro.timeline')">
        <div class="card aside-card">
          <div class="card-head">
            <h2>{{ t('intro.timeline') }}</h2>
          </div>
          <Timeline :items="timeline" />
        </div>
      </aside>
    </div>

    <!-- phones: a floating button opens the same timeline in a bottom sheet -->
    <button type="button" class="fab" @click="sheetOpen = true">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <circle cx="6" cy="6" r="1.6" /><circle cx="6" cy="12" r="1.6" /><circle cx="6" cy="18" r="1.6" /><path d="M11 6h9M11 12h9M11 18h9" />
      </svg>
      {{ t('intro.timeline') }}
    </button>
    <BottomSheet v-if="sheetOpen" :title="t('intro.timeline')" @close="sheetOpen = false">
      <Timeline :items="timeline" />
    </BottomSheet>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import SectionCard from '../components/SectionCard.vue'
import TagPill from '../components/TagPill.vue'
import Timeline from '../components/Timeline.vue'
import ProjectCard from '../components/ProjectCard.vue'
import LinkCard from '../components/LinkCard.vue'
import HobbyIcon from '../components/HobbyIcon.vue'
import BottomSheet from '../components/BottomSheet.vue'
import { t, tr } from '../i18n/index.js'
import { profile, researchTags, techTags, languages, timeline, hobbies, publications, projects, affiliations } from '../data/profile.js'

const sheetOpen = ref(false)
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 20px;
  align-items: start;
}

/* sticky side column — follows the page like a floating panel */
.layout__aside {
  position: sticky;
  top: calc(var(--nav-height) + 16px);
  align-self: start;
  padding: 28px 0 0;
}

.aside-card {
  max-height: calc(100vh - var(--nav-height) - 32px);
  overflow-y: auto;
  padding: 18px;
}

.aside-card .card-head h2 {
  font-size: 15px;
}

.profile-head {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 16px;
}

.avatar {
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 30%;
  border: 1px solid var(--gray-200);
  background: var(--gray-50);
}

.profile-id .eyebrow {
  margin-bottom: 6px;
}

.profile-id h1 {
  font-size: 26px;
  margin-bottom: 4px;
}

.name-scripts {
  font-size: 13px;
  color: var(--gray-600);
}

.bio {
  font-size: 14px;
  line-height: 1.75;
  color: var(--gray-600);
}

.bio p + p {
  margin-top: 0.85em;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.language-tags :deep(.tag) {
  max-width: 100%;
  white-space: normal;
  overflow-wrap: anywhere;
  line-height: 1.4;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.labs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 10px;
}

.pub-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.pub-list li {
  display: flex;
  gap: 14px;
  border-top: 1px solid var(--gray-100);
  padding-top: 16px;
}

.pub-list li:first-child {
  border-top: none;
  padding-top: 0;
}

.pub-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.pub-link {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid var(--gray-200);
  border-radius: 999px;
  font-size: 12px;
  color: var(--gray-900);
  transition: border-color 0.15s ease, color 0.15s ease;
}

.pub-link:hover {
  border-color: var(--green);
  color: var(--green-dark);
}

.pub-index {
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--orange);
  padding-top: 2px;
}

.pub-authors {
  font-size: 13px;
  color: var(--gray-600);
  margin-bottom: 4px;
}

.pub-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 4px;
}

.pub-venue {
  font-size: 12.5px;
  font-style: italic;
  color: var(--gray-600);
}

.hobby-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 10px;
}

.hobby {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 10px 14px;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  font-size: 13px;
}

.fab {
  display: none;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .layout__aside {
    display: none;
  }

  .fab {
    position: fixed;
    right: 14px;
    bottom: calc(16px + env(safe-area-inset-bottom));
    z-index: 40;
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 46px;
    padding: 0 18px;
    border: none;
    border-radius: 999px;
    background: var(--gray-900);
    color: var(--white);
    font-family: var(--font-mono);
    font-size: 13px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    -webkit-tap-highlight-color: transparent;
  }

  .fab:active {
    transform: scale(0.97);
  }
}

@media (max-width: 760px) {
  .two-col {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .profile-head {
    gap: 14px;
  }

  .avatar {
    width: 72px;
    height: 72px;
  }

  .profile-id h1 {
    font-size: 22px;
  }
}
</style>
