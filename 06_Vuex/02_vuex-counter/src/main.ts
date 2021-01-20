import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App).use(store).mount('#app')

// 分环境处理
// if (process.env.NODE_ENV === 'development') {
//     app.config.devtools = true
// }

