/* 导入 vue-router
    1. createRouter - 负责创建路由器
    2. createWebHistory - 可以设置路由的 history 模式
*/
import { createRouter , createWebHistory } from "vue-router"

// 导入需要使用的 路由组件
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Messages from '../views/Messages.vue'
import MessageDetail from '../views/MessageDetail.vue'

// 配置路由
const routes = [
    // 配置一般路由
    {
        path: '/home',
        component: Home,
        children: [
            // 配置子路由
            {
                // path: '/news', //任何情况下，/ 都代表根路径
                path: '/home/news', //可以直接配置绝对路径 
                component: News
            },
            {
                path: 'messages', //也可以配置相对路径(参考父路由组件路径)
                component: Messages,
                children: [
                    {
                        // 对于路径上不确定的值，可以使用 :占位符 用来匹配任意的值
                        path: '/home/messages/detail/:id',
                        component: MessageDetail
                    }
                ]
            },
            // 配置自动跳转的子路由组件
            {
                path: '/home/',
                redirect: '/home/news'
            }
        ]
    },
    {
        path: '/about',
        component: About
    },
    // 配置自动跳转路由
    {
        path: '/',
        redirect: '/home',
    }
]

// 配置路由器
const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'router-link-active'
})

export default router