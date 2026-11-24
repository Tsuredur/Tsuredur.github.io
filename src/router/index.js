import { createRouter, createWebHistory } from 'vue-router'
import Intro from '../views/Intro.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import Blog from '../views/Blog.vue'
import BlogPost from '../views/BlogPost.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'intro', component: Intro },
    { path: '/intro', redirect: '/' },
    { path: '/project', redirect: '/' },
    { path: '/about', redirect: '/' },
    { path: '/map', name: 'map', component: () => import('../views/Map.vue') },
    { path: '/map/:code', name: 'country', component: () => import('../views/Country.vue'), props: true },
    { path: '/project/:slug', name: 'project-detail', component: ProjectDetail, props: true },
    { path: '/blog', name: 'blog', component: Blog },
    { path: '/blog/:slug', name: 'blog-post', component: BlogPost, props: true },
    { path: '/:pathMatch(.*)*', redirect: { name: 'intro' } },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

export default router
