<template>
    <h2>Suspense 标签的使用</h2>
    <hr />
    <!-- 对于异步组件，可以使用 Suspense 标签使其在加载的过程中显的更加平滑 -->
    <Suspense>
        <!-- 指定异步组件的插槽为 default -->
        <template #default>
            <Child />
        </template>
        <!-- 指定等待组件的插槽为 fallback -->
        <template v-slot:fallback>
            <h2>loading....</h2>
        </template>
    </Suspense>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import Child from './components/Child.vue'
    export default defineComponent({
        name: 'App',
        components: {
            Child
        }
    })
</script>