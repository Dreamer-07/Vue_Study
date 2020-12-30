// 程序的主入口 ts 文件
// 引入 createApp 函数，用于创建对应的应用，产生应用的实例对象
import { createApp } from 'vue'
// 引入 App 组件(引入组件的父级组价)
import App from './App.vue'
// 创建 App 应用返回对应的实例对象，调用 mount 方法进行挂载到指定的选择器元素上
createApp(App).mount('#app')
