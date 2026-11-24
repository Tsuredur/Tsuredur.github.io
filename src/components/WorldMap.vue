<template>
  <div class="map">
    <div
      ref="stage"
      class="map__stage"
      :class="{ 'is-zoomed': k > 1 }"
      :style="{ touchAction: k > 1 ? 'none' : 'pan-y' }"
      @wheel.prevent="onWheel"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
    >
      <svg :viewBox="`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`" class="map__svg" role="group" :aria-label="t('map.title')">
        <g :transform="`translate(${x} ${y}) scale(${k})`">
          <path
            v-for="c in countries"
            :key="c.c || c.n"
            :d="c.d"
            class="land"
            :class="{ visited: isVisited(c), hovered: hover === c }"
            :tabindex="isVisited(c) ? 0 : -1"
            :role="isVisited(c) ? 'link' : undefined"
            :aria-label="isVisited(c) ? name(c) : undefined"
            @pointerenter="onEnter($event, c)"
            @pointerleave="onLeave($event, c)"
            @click="onClick(c)"
            @keydown.enter="open(c)"
          />
        </g>
      </svg>

      <div v-if="hover" class="map__label" :class="{ 'is-visited': isVisited(hover) }">
        {{ name(hover) }}<span v-if="isVisited(hover)" class="map__label-go"> → {{ t('map.open') }}</span>
      </div>

      <div class="map__controls" @pointerdown.stop>
        <button type="button" :aria-label="t('map.zoomIn')" @click="zoomBy(1.5)">+</button>
        <button type="button" :aria-label="t('map.zoomOut')" @click="zoomBy(1 / 1.5)">−</button>
        <button type="button" :aria-label="t('map.reset')" :disabled="k === 1" @click="reset">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4.5h4.5" /></svg>
        </button>
      </div>
    </div>

    <div class="map__foot">
      <div class="map__legend mono">
        <span class="map__swatch map__swatch--visited"></span>{{ t('map.visited') }}
        <span class="map__swatch"></span>{{ t('map.other') }}
      </div>
      <p class="map__hint mono">{{ t('map.tapHint') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { countries, MAP_WIDTH, MAP_HEIGHT } from '../data/world.js'
import { t, countryName } from '../i18n/index.js'

const props = defineProps({
  visited: { type: Array, default: () => [] } // lowercase ISO alpha-2 codes
})
const emit = defineEmits(['open'])

const MAX_ZOOM = 8
const stage = ref(null)
const k = ref(1)
const x = ref(0)
const y = ref(0)
const hover = ref(null)

const visitedSet = new Set(props.visited)
const isVisited = c => !!c.c && visitedSet.has(c.c)
const name = c => countryName(c.c, c.n)

function open(c) {
  if (isVisited(c)) emit('open', c.c)
}

/* ---------- hover / tap ---------- */
function onEnter(e, c) {
  if (e.pointerType !== 'touch') hover.value = c
}
function onLeave(e, c) {
  if (e.pointerType !== 'touch' && hover.value === c) hover.value = null
}
let dragged = false
function onClick(c) {
  if (dragged) return
  hover.value = c // on touch screens a tap shows the name
  open(c)
}

/* ---------- pan / zoom ---------- */
function clamp() {
  k.value = Math.min(MAX_ZOOM, Math.max(1, k.value))
  x.value = Math.min(0, Math.max(MAX_WIDTH_FIX(), x.value))
  y.value = Math.min(0, Math.max(MAX_HEIGHT_FIX(), y.value))
}
const MAX_WIDTH_FIX = () => MAP_WIDTH - MAP_WIDTH * k.value
const MAX_HEIGHT_FIX = () => MAP_HEIGHT - MAP_HEIGHT * k.value

function unit() {
  // client px -> svg units
  const r = stage.value.getBoundingClientRect()
  return { r, s: r.width / MAP_WIDTH }
}

function zoomAt(factor, px, py) {
  const next = Math.min(MAX_ZOOM, Math.max(1, k.value * factor))
  const f = next / k.value
  x.value = px - (px - x.value) * f
  y.value = py - (py - y.value) * f
  k.value = next
  clamp()
}

function zoomBy(factor) {
  zoomAt(factor, MAP_WIDTH / 2, MAP_HEIGHT / 2)
}
function reset() {
  k.value = 1
  x.value = 0
  y.value = 0
}

function onWheel(e) {
  const { r, s } = unit()
  zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, (e.clientX - r.left) / s, (e.clientY - r.top) / s)
}

const pointers = new Map()
let lastDist = 0
let moved = 0

function onDown(e) {
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
  if (pointers.size === 1) {
    dragged = false
    moved = 0
  }
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()]
    lastDist = Math.hypot(a.x - b.x, a.y - b.y)
  }
}

function onMove(e) {
  const prev = pointers.get(e.pointerId)
  if (!prev) return
  const cur = { x: e.clientX, y: e.clientY }
  const { r, s } = unit()

  if (pointers.size === 1) {
    moved += Math.abs(cur.x - prev.x) + Math.abs(cur.y - prev.y)
    if (moved > 6) dragged = true
    if (k.value > 1 && dragged) {
      x.value += (cur.x - prev.x) / s
      y.value += (cur.y - prev.y) / s
      clamp()
    }
  } else if (pointers.size === 2) {
    dragged = true
    pointers.set(e.pointerId, cur)
    const [a, b] = [...pointers.values()]
    const dist = Math.hypot(a.x - b.x, a.y - b.y)
    if (lastDist > 0) {
      zoomAt(dist / lastDist, ((a.x + b.x) / 2 - r.left) / s, ((a.y + b.y) / 2 - r.top) / s)
    }
    lastDist = dist
    return
  }
  pointers.set(e.pointerId, cur)
}

function onUp(e) {
  pointers.delete(e.pointerId)
  lastDist = 0
  // a drag must not turn into a click on release
  if (dragged) setTimeout(() => { dragged = false }, 0)
}
</script>

<style scoped>
.map__stage {
  position: relative;
  aspect-ratio: 960 / 500;
  border-radius: 12px;
  background: var(--map-sea);
  border: 1px solid var(--gray-200);
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
}

.map__stage.is-zoomed {
  cursor: grab;
}

.map__svg {
  display: block;
  width: 100%;
  height: 100%;
}

.land {
  fill: var(--map-land);
  stroke: var(--white);
  stroke-width: 0.6;
  vector-effect: non-scaling-stroke;
  transition: fill 0.12s ease;
  outline: none;
}

.land.hovered {
  fill: var(--map-hover);
}

.land.visited {
  fill: var(--green);
  cursor: pointer;
}

.land.visited.hovered,
.land.visited:focus-visible {
  fill: var(--orange);
}

.map__label {
  position: absolute;
  left: 10px;
  top: 10px;
  max-width: calc(100% - 80px);
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--gray-200);
  background: var(--nav-bg);
  backdrop-filter: blur(6px);
  font-size: 13px;
  font-weight: 500;
  pointer-events: none;
}

.map__label.is-visited {
  border-color: var(--green-border);
  color: var(--green-dark);
}

.map__label-go {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--orange-dark);
}

.map__controls {
  position: absolute;
  right: 8px;
  bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.map__controls button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  background: var(--nav-bg);
  backdrop-filter: blur(6px);
  color: var(--gray-900);
  font-size: 20px;
  line-height: 1;
  font-family: var(--font-mono);
  -webkit-tap-highlight-color: transparent;
}

.map__controls button:active {
  background: var(--gray-100);
}

.map__controls button:disabled {
  opacity: 0.4;
}

.map__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px 16px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.map__legend {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--gray-600);
}

.map__swatch {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: var(--map-land);
  border: 1px solid var(--gray-300);
}

.map__swatch + .map__swatch,
.map__legend .map__swatch:not(:first-child) {
  margin-left: 10px;
}

.map__swatch--visited {
  background: var(--green);
  border-color: var(--green);
}

.map__hint {
  font-size: 11.5px;
  color: var(--gray-400);
}
</style>
