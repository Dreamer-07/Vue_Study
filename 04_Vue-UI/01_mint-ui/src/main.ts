import Vue from 'vue'
import App from './App.vue'
import { Button } from 'mint-ui'

Vue.config.productionTip = false
// 注册全局组件
Vue.component(Button.name,Button)

new Vue({
  render: h => h(App),
}).$mount('#app')
