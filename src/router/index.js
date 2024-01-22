import { createRouter, createWebHashHistory } from 'vue-router'
import A from '../views/PageA.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/a',
      name: 'a',
      component: A,
    },
  ],
})

export default router
