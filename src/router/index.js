import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: () => import('@/views/index/index.vue'),
      children: [
        {
          path: 'home',
          component: () => import('@/views/index/home/index.vue')
        },
        {
          path: 'about-me',
          component: () => import('@/views/index/about-me/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login.vue')
    }
  ]
})

export default router
