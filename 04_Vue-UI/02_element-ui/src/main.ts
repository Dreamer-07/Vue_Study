import Vue from 'vue'
import App from './App.vue'
// // 引入 ElementUI 的全部組件
// import ElementUI from 'element-ui'
// // 还需要单独的引入样式文件
// import 'element-ui/lib/theme-chalk/index.css'
// // 注册插件
// Vue.use(ElementUI)

// 引入部分组件
import {Button , Row} from 'element-ui'
// 注册全局组件
Vue.component(Button.name,Button);
Vue.component(Row.name,Row)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
