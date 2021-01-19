import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

window.onhashchange = function (event: {}) {
    /* 
    HashChangeEvent{oldURL: "http://localhost:8080/#/home/news", newURL: "http://localhost:8080/#/home/about",....}
    该对象包含了 oldURL(跳转前的页面) 和 newURL(跳转后的页面) 属性
    */
    console.log(event);
    /* 当前游览器地址，包含了 hash 值 */
    console.log(location);
    /* hash 值：地址中 # 后面的数据 */
    console.log(location.hash);
}