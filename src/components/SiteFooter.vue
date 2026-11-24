<template>
  <footer class="footer">
    <div class="page footer__inner">
      <div class="footer__links">
        <a :href="profile.github" target="_blank" rel="noopener">{{ t('footer.github') }}</a>
        <a :href="`mailto:${profile.email}`">{{ t('footer.mail') }}</a>
      </div>
      <p class="footer__text">SHIKARU © {{ year }} · {{ t('footer.motto') }}</p>
    </div>
  </footer>
</template>

<script setup>
import { t } from '../i18n/index.js'
import { profile } from '../data/profile.js'

const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--gray-100);
  margin-top: 40px;
}

.footer__inner {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--gray-400);
}

.footer__links {
  display: flex;
  gap: 8px;
}

.footer__links a {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid var(--gray-200);
  border-radius: 999px;
  color: var(--gray-600);
}

.footer__links a:hover {
  color: var(--orange);
  border-color: var(--gray-400);
}
</style>
