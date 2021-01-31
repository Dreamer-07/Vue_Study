<template>
  <h2>ref() 函数获取页面标签元素</h2>
  <!-- vue 的 html 模板中的标签可以通过定义 ref 属性快速定位 -->
  <input type="text" ref="inputRef">
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  export default defineComponent({
    name: 'App',
    setup() {
      // setup 在页面挂载前执行，所以默认值设置为 null
      const inputRef = ref<HTMLElement | null>(null); //  选择合适的数据类型能更助于开发效率
      // 挂载结束后执行相应操作
      onMounted(() => {
        inputRef.value && inputRef.value.focus(); //自动获取焦点
      })
      return {
        inputRef
      }
    }
  })
</script>