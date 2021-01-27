// 程序的主入口文件
// 引入 createApp() 函数，该函数会创建对应的应用，产生应用的实例对象
import { createApp } from 'vue'
// 引入 App 组件(根组件)
import App from './App.vue'
// 创建 App 组件的应用实例后使用 mount() 挂载到页面上
createApp(App).mount('#app')
