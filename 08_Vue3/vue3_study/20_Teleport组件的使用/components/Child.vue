<template>
    <h2>Child 子级组件</h2>
    <button @click="isShow=true">显示对话框</button>
    <hr />
    <!-- 使用 Teleport 标签: to 属性指定要插入的指定标签 -->
    <Teleport to='body' >
        <div v-if="isShow" class="model">
            <h4>This is 会话框 です</h4>
            <button @click="isShow=false">关闭会话框</button>
        </div>
    </Teleport>

</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'App',
        setup() {
            const isShow = ref(false)
            return {
                isShow
            }
        }
    })
</script>

<style>
    /* 样式仍可以·定义在原组件中 */
    .model {
        color: red;
    }
</style>