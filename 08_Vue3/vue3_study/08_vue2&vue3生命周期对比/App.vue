<template>
  <h2>vue2 生命周期钩子函数和 vue3 的组合式 API 对比</h2>
  <button @click="isShow = !isShow">挂载/卸载</button>
  <hr />
  <Child v-if="isShow"/>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Child from './components/Child.vue'
  export default defineComponent({
    name: 'App',
    setup() {
      const isShow = ref(true);
      return {
        isShow
      }
    },
    components: {
      Child
    }
  })
</script>