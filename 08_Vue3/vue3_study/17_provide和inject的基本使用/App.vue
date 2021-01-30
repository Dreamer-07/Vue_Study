<template>
    <h2>provide和inject的基本使用</h2>
    <p>当前颜色：{{color}}</p>
    <button @click="color='red'">红色</button>
    <button @click="color='blue'">蓝色</button>
    <button @click="color='yellow'">黄色</button>
    <hr>
    <Son />
</template>

<script lang="ts">
    import { defineComponent, provide, ref } from 'vue'
    import Son from './components/Son.vue'
    export default defineComponent({
        name: 'App',
        setup() {
            const color = ref('red');
            /* 
            通过 provide() 提供数据
                - 第一个参数为数据标识
                - 第二个参数为对应的数据
            */
            provide('color',color);
            return {
                color
            }
        },
        components: {
            Son
        }
    })
</script>