<template>
  <Teleport to="body">
    <div class="backdrop" @click.self="$emit('close')">
      <div class="sheet" role="dialog" aria-modal="true" :aria-label="title">
        <span class="sheet__handle" aria-hidden="true"></span>
        <button class="sheet__close" type="button" :aria-label="t('common.close')" @click="$emit('close')">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
        </button>
        <h3 class="sheet__title">{{ title }}</h3>
        <div class="sheet__body"><slot /></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { t } from '../i18n/index.js'

defineProps({ title: { type: String, default: '' } })
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
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: var(--overlay);
  backdrop-filter: blur(2px);
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
  overscroll-behavior: contain;
  padding: 14px 20px calc(24px + env(safe-area-inset-bottom));
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 20px 20px 0 0;
  animation: slide-up 0.22s ease;
}

@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.sheet__handle {
  display: block;
  width: 38px;
  height: 4px;
  margin: 0 auto 14px;
  border-radius: 2px;
  background: var(--gray-200);
}

.sheet__close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: var(--gray-50);
  color: var(--gray-600);
}

.sheet__title {
  font-size: 16px;
  margin-bottom: 14px;
  padding-right: 44px;
}

@media (min-width: 641px) {
  .backdrop {
    align-items: center;
    padding: 24px;
  }

  .sheet {
    border-radius: 16px;
    padding-bottom: 24px;
    animation: pop 0.18s ease;
  }

  .sheet__handle {
    display: none;
  }
}

@keyframes pop {
  from { transform: scale(0.96); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
