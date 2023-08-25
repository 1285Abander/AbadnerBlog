import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'home',
    component: () => import('../views/HomeView/index.vue')
  }, {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView/index.vue')
  }, {
    path: '/write',
    name: 'write',
    component: () => import('../views/BlogWrite/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
