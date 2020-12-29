<template>
    <p>{{ msg }}</p>
</template>

<script lang="ts">
    // 暴露一个配置对象(和 Vue 一致)
    export default {
        // 这里的 data 必须写成函数
        data(){
            // 函数中返回一个对象，该对应就是 data 数据
            return {
                msg: "巴御前天下第一！"
            }
        }
    }
</script>

<style>
    p {
        font-size: 20px;
        color: red;
    }
</style>