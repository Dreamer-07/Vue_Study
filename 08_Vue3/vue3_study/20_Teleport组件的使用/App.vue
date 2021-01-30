<template>
    <h2>Teleport 组件的使用</h2>
    <hr />
    <Child />
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