<template>
    <ul>
        <!-- 优化 v-for
                1. 如果遍历时不使用第二个参数(索引)，可以直接去除()
                2. 如果遍历的数据本身具有标识符，建议 :key 使用其
        -->
        <li v-for="message in messages" :key="message.id">
            <!-- 使用 `` 定义动态的链接，通过路径参数传递数据 -->
            <router-link :to="`/home/messages/detail/${message.id}`">
            <!-- <router-link :to="`/home/messages/detail?id=${message.id}`"> -->
                {{message.title}}
            </router-link>
            <button @click="pushShow(message.id)">push查看</button>
            <button @click="replaceShow(message.id)">replace查看</button>
        </li> 
        <br>
        <!-- 控制 $router 完成请求返回 -->
        <button @click="$router.back()">back</button>
        <br>
        <button @click="$router.go(2)">go</button>
    </ul>
    <hr />
    <router-view />
</template>

<script lang="ts">
    export default {
        data () {
            return {
                messages: []
            }
        },
        mounted () {
            // 模拟异步发送 Ajax
            setTimeout(() => {
                const messages = [
                    {
                        id: 1,
                        title: 'message01'
                    },
                    {
                        id: 2,
                        title: 'message02'
                    },
                    {
                        id: 4,
                        title: 'message04'
                    }
                ];
                (this as any).messages = messages
            },1000)
        },
        methods: {
            // 以 push 的方式访问新路由
            pushShow (id: number) {
                (this as any).$router.push(`/home/messages/detail/${id}`)
            },
            // 以 replace 的方式访问路由
            replaceShow (id: number) {
                (this as any).$router.replace(`/home/messages/detail/${id}`)
            }
        },
    }
</script>