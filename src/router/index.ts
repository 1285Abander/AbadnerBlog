import { message } from 'ant-design-vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'home',
    component: () => import('../views/HomeView/index.vue'),
    meta: {
      write: false
    }
  }, {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView/index.vue'),
    meta: {
      write: false
    }
  }, {
    path: '/write',
    name: 'write',
    component: () => import('../views/BlogWrite/index.vue'),
    meta: {
      write: true
    }
  }, {
    path: '/test',
    name: 'test',
    component: () => import('../views/BlogTest/index.vue'),
    meta: {
      write: false
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.write) {
    if (localStorage.getItem("token") === "Abander") {
      next()
      message.success("欢迎回来,Abadner")
    } else {
      next()
      message.info("当前权限不足，无法操作")
    }
  } else {
    next()
  }
})

export default router
