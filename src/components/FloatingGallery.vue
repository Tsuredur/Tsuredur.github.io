<template>
  <div ref="box" class="gallery" :style="{ height: height + 'px' }">
    <button
      v-for="(it, i) in items"
      :key="i"
      type="button"
      class="float"
      :style="it.style"
      :aria-label="tr(photos[i].title) || t('country.hint')"
      @click="$emit('open', i)"
    >
      <span class="float__inner">
        <img :src="photos[i].thumb || photos[i].src" :alt="tr(photos[i].title) || ''" loading="lazy" draggable="false" @error="fallbackToFullImage($event, photos[i])" />
        <span class="float__badge" aria-hidden="true">
          <svg v-if="photos[i].video" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
          <svg v-else viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg>
        </span>
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { t, tr } from '../i18n/index.js'

const props = defineProps({
  photos: { type: Array, required: true },
  seed: { type: String, default: '' }
})
defineEmits(['open'])

const box = ref(null)
const items = ref([])
const height = ref(320)
let ro = null
let lastWidth = 0

function fallbackToFullImage(event, photo) {
  const image = event.currentTarget
  if (photo.thumb && image.getAttribute('src') === photo.thumb) {
    image.src = photo.src
  }
}

// small deterministic PRNG so a country always gets the same arrangement
function hash(str) {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return h >>> 0
}
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function overlap(a, b) {
  const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)
  const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
  return w > 0 && h > 0 ? w * h : 0
}

function layout() {
  const W = box.value ? box.value.clientWidth : 0
  if (!W) return
  lastWidth = W
  const rnd = mulberry32(hash(props.seed + ':' + props.photos.length))
  const pad = 18
  const small = W < 520
  const minW = small ? 96 : 140
  const maxW = small ? Math.min(180, W * 0.52) : Math.min(280, W * 0.34)

  // random size per photo, keeping its aspect ratio
  const rects = props.photos.map((p, i) => {
    const ratio = p.ratio || 1.4
    let w = minW + rnd() * (maxW - minW)
    let h = w / ratio
    const maxH = small ? 220 : 320
    if (h > maxH) { h = maxH; w = h * ratio }
    return { i, w, h, x: 0, y: 0 }
  })

  const area = rects.reduce((s, r) => s + r.w * r.h, 0)
  const H = Math.max(small ? 380 : 440, Math.ceil((area * 1.8) / (W - pad * 2)) + 2 * pad + 60)

  const placed = []
  // place large ones first so small ones fill the gaps
  for (const r of [...rects].sort((a, b) => b.w * b.h - a.w * a.h)) {
    let best = null
    let bestScore = Infinity
    for (let n = 0; n < 120; n++) {
      const cand = {
        x: pad + rnd() * Math.max(1, W - r.w - pad * 2),
        y: pad + rnd() * Math.max(1, H - r.h - pad * 2)
      }
      const test = { ...cand, w: r.w, h: r.h }
      const score = placed.reduce((s, p) => s + overlap(test, p), 0)
      if (score < bestScore) { bestScore = score; best = cand }
      if (score === 0) break
    }
    r.x = best.x
    r.y = best.y
    placed.push(r)
  }

  height.value = H
  items.value = rects.map(r => {
    const dur = 7 + rnd() * 6
    const sx = rnd() < 0.5 ? -1 : 1
    const sy = rnd() < 0.5 ? -1 : 1
    return {
      style: {
        left: r.x + 'px',
        top: r.y + 'px',
        width: r.w + 'px',
        height: r.h + 'px',
        zIndex: 1 + Math.floor(rnd() * 5),
        '--dx': sx * (6 + rnd() * 12) + 'px',
        '--dy': sy * (6 + rnd() * 12) + 'px',
        '--r0': (rnd() * 4 - 2).toFixed(2) + 'deg',
        '--r1': (rnd() * 4 - 2).toFixed(2) + 'deg',
        '--dur': dur.toFixed(2) + 's',
        '--delay': (-rnd() * dur).toFixed(2) + 's'
      }
    }
  })
}

onMounted(async () => {
  await nextTick()
  layout()
  ro = new ResizeObserver(() => {
    // only re-arrange when the width really changes (not on our own height change)
    if (box.value && Math.abs(box.value.clientWidth - lastWidth) > 24) layout()
  })
  ro.observe(box.value)
})
onUnmounted(() => ro && ro.disconnect())
watch(() => props.photos, () => nextTick(layout))
</script>

<style scoped>
.gallery {
  position: relative;
  width: 100%;
}

.float {
  position: absolute;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  animation: drift var(--dur) ease-in-out var(--delay) infinite alternate;
  -webkit-tap-highlight-color: transparent;
  will-change: transform;
}

.float:hover,
.float:focus-visible {
  z-index: 10 !important;
}

.float__inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--gray-200);
  background: var(--gray-50);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.float:hover .float__inner {
  transform: scale(1.05);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);
}

.float:active .float__inner {
  transform: scale(0.98);
}

.float__badge {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(20, 22, 27, 0.72);
  color: #fff;
  border: 1.5px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  transition: background 0.15s ease, transform 0.15s ease;
}

.float:hover .float__badge,
.float:focus-visible .float__badge {
  background: var(--orange);
  transform: scale(1.12);
}

.float__inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes drift {
  from {
    transform: translate3d(0, 0, 0) rotate(var(--r0));
  }
  to {
    transform: translate3d(var(--dx), var(--dy), 0) rotate(var(--r1));
  }
}

@media (prefers-reduced-motion: reduce) {
  .float {
    animation: none;
  }
}
</style>
