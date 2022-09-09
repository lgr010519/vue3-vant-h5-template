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
      path: '/jzxx',
      component: () => import('@/views/jzxx/index.vue')
    },
    {
      path: '/rmjy',
      component: () => import('@/views/rmjy/index.vue')
    },
    {
      path: '/wdsx',
      component: () => import('@/views/wdsx/index.vue')
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
      component: () => import('../views/password-login/index.vue')
    },
    {
      // 验证码登录
      path: '/verify',
      name: 'verify',
      component: () => import('../views/verify-login/index.vue')
    },
    {
      // 忘记密码/修改密码
      path: '/forget',
      name: 'forget',
      component: () => import('../views/forget-password/index.vue')
    }
  ]
})

export default router
