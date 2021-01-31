<template>
    <h2>Child 异步组件</h2>
    <p>msg: {{msg}}</p>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import axios from 'axios'
    export default defineComponent({
        name: 'Child',
        /* 
        通过 async 修饰 setup 函数，使其执行异步任务
            - 使当前组件成功一个异步组件
        */
        async setup() {
            // 执行异步任务
            const result = await axios.get('/data/address.json');
            // 依然返回一个对象，该对象中的数据可以为对应的 promise 成功的值
            return {
                msg: result.data
            }
        }
    })
</script>