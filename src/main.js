import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/styles/index.scss'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
const app = createApp(App)
console.log('我是傻逼')
app.use(createPinia())
app.use(router)
app.mount('#app')
