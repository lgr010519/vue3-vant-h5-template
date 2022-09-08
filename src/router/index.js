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
      // 注册
      path: '/register',
      name: 'register',
      component: () => import('../views/register/index.vue')
    },
    {
      // 密码登录
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      // 验证码登录
      path: '/verify',
      name: 'verify',
      component: () => import('../views/verify/index.vue')
    },
  ]
})

export default router
