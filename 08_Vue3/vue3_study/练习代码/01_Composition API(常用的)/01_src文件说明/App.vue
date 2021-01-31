<template>
  <!-- vue2 中的 HTML 模板需要根标签，但 vue3 可以不用 -->
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
</template>


<script lang="ts">
// 导入 defineComponent() 函数，内部可以传入一个配置对象(vm)，定义一个组件
import { defineComponent } from 'vue';
// 导入子级组件
import HelloWorld from './components/HelloWorld.vue';
// 导出一个定义的组件
export default defineComponent({
  // 组件名
  name: 'App',
  // 对应的局部子级组件
  components: {
    // 注册子级组件
    HelloWorld
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
