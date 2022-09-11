import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Toast } from 'vant';
import App from './App.vue'
import router from './router'
import './assets/styles/index.scss'
import 'vant/es/toast/style'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)
app.mount('#app')
