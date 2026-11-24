<template>
  <Teleport to="body">
    <div class="backdrop" @click.self="$emit('close')">
      <div class="sheet" role="dialog" aria-modal="true" :aria-label="tr(hobby.label)">
        <span class="sheet__handle" aria-hidden="true"></span>
        <button class="sheet__close" @click="$emit('close')" :aria-label="t('common.close')">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
        </button>

        <div class="sheet__header">
          <HobbyIcon :icon="hobby.icon" />
          <h3>{{ tr(hobby.label) }}</h3>
        </div>

        <div class="sheet__grid">
          <template v-if="hobby.photos && hobby.photos.length">
            <figure v-for="(p, i) in hobby.photos" :key="i">
              <img :src="p.src" :alt="tr(p.caption) || tr(hobby.label)" />
              <figcaption v-if="p.caption" class="mono">{{ tr(p.caption) }}</figcaption>
            </figure>
          </template>
          <template v-else>
            <PlaceholderImage v-for="n in 4" :key="n" :tone="n % 2 ? 'green' : 'orange'" />
          </template>
        </div>

        <p class="sheet__note mono">{{ t('hobby.note') }}</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { t, tr } from '../i18n/index.js'
import HobbyIcon from './HobbyIcon.vue'
import PlaceholderImage from './PlaceholderImage.vue'

defineProps({
  hobby: { type: Object, required: true }
})
const emit = defineEmits(['close'])

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: var(--overlay);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 100;
  animation: fade-in 0.15s ease;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.sheet {
  position: relative;
  width: 100%;
  max-width: 480px;
  max-height: 82vh;
  overflow-y: auto;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  padding: 12px 20px 28px;
  animation: slide-up 0.22s cubic-bezier(0.2, 0.8, 0.3, 1);
}

@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.sheet__handle {
  display: block;
  width: 36px;
  height: 4px;
  border-radius: 999px;
  background: var(--gray-200);
  margin: 6px auto 14px;
}

.sheet__close {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--gray-200);
  background: var(--white);
  color: var(--gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sheet__header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-right: 36px;
}

.sheet__header h3 {
  font-family: var(--font-display);
  font-size: 17px;
}

.sheet__header :deep(.hobby-icon) {
  width: 22px;
  height: 22px;
}

.sheet__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}

.sheet__grid figure {
  margin: 0;
}

.sheet__grid img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid var(--gray-200);
}

.sheet__grid figcaption {
  font-size: 11px;
  color: var(--gray-600);
  margin-top: 6px;
}

.sheet__note {
  font-size: 11.5px;
  color: var(--gray-400);
  text-align: center;
}

/* ---- desktop: centered dialog instead of a bottom sheet ---- */
@media (min-width: 640px) {
  .backdrop {
    align-items: center;
    padding: 24px;
  }

  .sheet {
    border-radius: 18px;
    border-bottom: 1px solid var(--gray-200);
    padding: 22px 24px 26px;
    animation: pop-in 0.16s ease;
  }

  .sheet__handle {
    display: none;
  }

  @keyframes pop-in {
    from { opacity: 0; transform: translateY(8px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
}
</style>
