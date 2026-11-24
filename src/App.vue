<template>
  <TopNav />
  <RouterView v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </RouterView>
  <SiteFooter />
</template>

<script setup>
import TopNav from './components/TopNav.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
