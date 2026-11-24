<template>
  <Teleport to="body">
    <div class="lb" role="dialog" aria-modal="true" @click.self="$emit('close')" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
      <button class="lb__close" type="button" :aria-label="t('common.close')" @click="$emit('close')">
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
      </button>

      <button v-if="photos.length > 1" class="lb__nav lb__nav--prev" type="button" :aria-label="t('lightbox.prev')" @click="go(-1)">‹</button>
      <button v-if="photos.length > 1" class="lb__nav lb__nav--next" type="button" :aria-label="t('lightbox.next')" @click="go(1)">›</button>

      <figure class="lb__fig">
        <video v-if="photo.video" :key="photo.video" :src="photo.video" :poster="photo.src" class="lb__img" controls playsinline preload="metadata"></video>
        <img v-else :key="photo.src" :src="photo.src" :alt="tr(photo.title) || ''" class="lb__img" />
        <figcaption class="lb__info">
          <div class="lb__top">
            <h2 v-if="photo.title" class="lb__title">{{ tr(photo.title) }}</h2>
            <span class="lb__count mono">{{ index + 1 }} / {{ photos.length }}</span>
          </div>
          <p v-if="photo.date" class="lb__date mono">{{ photo.date }}</p>
          <p v-if="photo.text" class="lb__text">{{ tr(photo.text) }}</p>
        </figcaption>
      </figure>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { t, tr } from '../i18n/index.js'

const props = defineProps({
  photos: { type: Array, required: true },
  index: { type: Number, required: true }
})
const emit = defineEmits(['close', 'update:index'])

const photo = computed(() => props.photos[props.index])

function go(d) {
  const n = props.photos.length
  emit('update:index', (props.index + d + n) % n)
}

function onKey(e) {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowLeft') go(-1)
  else if (e.key === 'ArrowRight') go(1)
}

let sx = 0
function onTouchStart(e) { sx = e.changedTouches[0].clientX }
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - sx
  if (Math.abs(dx) > 50 && props.photos.length > 1) go(dx < 0 ? 1 : -1)
}

onMounted(() => {
  document.addEventListener('keydown', onKey)
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 56px 16px 24px;
  overflow-y: auto;
  background: rgba(8, 9, 12, 0.88);
  animation: lb-in 0.15s ease;
}

@keyframes lb-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lb__fig {
  margin: auto;
  max-width: min(960px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.lb__img {
  max-width: 100%;
  max-height: 52vh;
  border-radius: 10px;
  object-fit: contain;
}

.lb__info {
  width: min(100%, 560px);
  color: #fff;
}

.lb__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 6px;
}

.lb__title {
  font-size: 17px;
  color: #fff;
}

.lb__count {
  flex-shrink: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.lb__date {
  font-size: 12px;
  color: var(--orange);
  margin-bottom: 8px;
}

.lb__text {
  white-space: pre-line;
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.82);
}

.lb__close,
.lb__nav {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 26px;
  line-height: 1;
  -webkit-tap-highlight-color: transparent;
}

.lb__close {
  top: 8px;
  right: 8px;
}

.lb__nav:active,
.lb__close:active {
  background: rgba(255, 255, 255, 0.24);
}

.lb__nav {
  top: 50%;
  transform: translateY(-50%);
}
.lb__nav--prev { left: 8px; }
.lb__nav--next { right: 8px; }

@media (max-width: 640px) {
  .lb {
    padding-bottom: 76px;
  }

  .lb__nav {
    top: auto;
    bottom: 12px;
    transform: none;
  }
}
</style>
