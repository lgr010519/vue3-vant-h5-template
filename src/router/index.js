import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/index.vue')
    },
    // 密码登录
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/password-login/index.vue')
    },
    // 验证码登录
    {
      path: '/verify',
      name: 'verify',
      component: () => import('@/views/verify-login/index.vue')
    },
    // 忘记密码/修改密码
    {
      path: '/forget',
      name: 'forget',
      component: () => import('@/views/forget-password/index.vue')
    },
    // 首页
    {
      path: '/index',
      component: () => import('@/views/index/index.vue'),
      redirect: '/index/home',
      meta: {
        requireAuth: true
      },
      children: [
        // 主页
        {
          path: 'home',
          component: () => import('@/views/index/home/index.vue')
        },
        // 我的
        {
          path: 'about-me',
          component: () => import('@/views/index/about-me/index.vue')
        }
      ]
    },
    // 系统二维码
    {
      path: '/system-code',
      component: () => import('@/views/system-code/index.vue'),
      meta: {
        requireAuth: false
      }
    },
    // 局长信箱
    {
      path: '/jzxx/:mode/:id?',
      component: () => import('@/views/jzxx/index.vue'),
      meta: {
        requireAuth: true
      }
    },
    // 人民建议征集
    {
      path: '/rmjy/:mode/:id?',
      component: () => import('@/views/rmjy/index.vue'),
      meta: {
        requireAuth: true
      }
    },
    // 我的诉求
    {
      path: '/wdsq',
      component: () => import('@/views/wdsq/index.vue'),
      meta: {
        requireAuth: true
      }
    },
    // 我的诉求-服务说明
    {
      path: '/wdsq/service-note',
      component: () => import('@/views/wdsq/service-note/index.vue'),
      meta: {
        requireAuth: true
      }
    },
    // 我的诉求-站点地址
    {
      path: '/wdsq/service-stations',
      component: () => import('@/views/wdsq/service-stations/index.vue'),
      meta: {
        requireAuth: true
      }
    },
    // 我的诉求-新增诉求
    {
      path: '/wdsq/appeal/:mode/:id?',
      component: () => import('@/views/wdsq/appeal/index.vue'),
      meta: {
        requireAuth: true
      }
    },
    // 我的事项
    {
      path: '/wdsx',
      component: () => import('@/views/wdsx/index.vue'),
      meta: {
        requireAuth: true
      }
    }
  ]
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const token = localStorage.getItem('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
