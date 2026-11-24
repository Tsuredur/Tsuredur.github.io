import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const repository = process.env.GITHUB_REPOSITORY
const repoName = repository?.split('/')[1]
const isUserSite = repository && repoName?.toLowerCase() === `${repository.split('/')[0]}.github.io`.toLowerCase()

// https://vite.dev/config/
export default defineConfig({
  base: repoName && !isUserSite ? `/${repoName}/` : '/',
  plugins: [vue()],
})
