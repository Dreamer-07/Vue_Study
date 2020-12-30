<template>
    <img src="./assets/logo.png" alt="log" />
    <!-- 3. 使用子组件 -->
    <HelloWorld/>
</template>

<script lang="ts">
    /* 1. 导入需要的子级组件 */
    import HelloWorld from "./components/HelloWorld.vue"
    /* 2. 在父组件中注册子组件 */
    export default {
        name: 'App',
        components: {
            // 注册子组件
            HelloWorld
        }
    }
</script>

<style>
    img {
        width: 200px;
        height: 200px
    }
</style>