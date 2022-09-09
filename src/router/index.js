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
      redirect: '/index/home',
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
      path: '/jzxx/:mode/:id?',
      component: () => import('@/views/jzxx/index.vue')
    },
    {
      path: '/rmjy/:mode/:id?',
      component: () => import('@/views/rmjy/index.vue')
    },
    {
      path: '/wdsq',
      component: () => import('@/views/wdsq/index.vue')
    },
    {
      path: '/wdsq/service-note',
      component: () => import('@/views/wdsq/service-note/index.vue')
    },
    {
      path: '/wdsq/service-stations',
      component: () => import('@/views/wdsq/service-stations/index.vue')
    },
    {
      path: '/wdsq/appeal/:mode',
      component: () => import('@/views/wdsq/appeal/index.vue')
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
    },
    {
      path: '/system-code',
      component: () => import('@/views/system-code/index.vue')
    }
  ]
})

export default router
