<template>
    <ul id="details" v-if="messageDetail">
        <li>id: {{messageDetail.id}}</li>
        <li>title: {{messageDetail.title}}</li>
        <li>content: {{messageDetail.content}}</li>
    </ul>
</template>

<script lang="ts">
    export default {
        data () {
            return {
                messageDetail: null
            }
        },
        // 在组件初始化之后发送 Ajax 请求获取数据 
        mounted () {
            // 1. 获取数据
            setTimeout(() => {
                const that = (this as any)
                const allMessageDetail =  [
                    {
                        id: 1,
                        title: 'message01',
                        content: 'content01'
                    },
                    {
                        id: 2,
                        title: 'message02',
                        content: 'content02'
                    },
                    {
                        id: 4,
                        title: 'message04',
                        content: 'content04'
                    }
                ];
                // 2. 初始化页面数据
                that.allMessageDetail = allMessageDetail;
                const id = that.$route.params.id * 1
                that.messageDetail = allMessageDetail.find(detail => detail.id === id);
            },1000)
        },
        // 使用 watch 监听 $route 路由属性
        watch : {
            $route: function(value: any){
                // 1. 获取当前路由属性对应的数据
                const id = value.params.id * 1
                const { allMessageDetail } = this as any
                // 2. 使用 id 获取对应的 message 信息
                const message = allMessageDetail.find((detail: {id: number}) =>  detail.id === id);
                // 3. 赋值
                (this as any).messageDetail = message;
            }
        }
    } 
</script>

<style>
    #details {
        margin-top: 20px;
    }
</style>