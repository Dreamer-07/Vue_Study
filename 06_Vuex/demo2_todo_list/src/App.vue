<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- 可以使用单词小字母开头，多个单词间用-连接的格式使用组件 -->
      <todo-header />
      <todo-list />
      <todo-footer />
    </div>
  </div>
</template>

<script>
  import TodoHeader from "./components/TodoHeader.vue"
  import TodoList from "./components/TodoList.vue"
  import TodoFooter from "./components/TodoFooter.vue"

  export default {
    components: {
      TodoHeader,
      TodoList,
      TodoFooter
    },
    mounted () {
      // 初始化时发布 action，请求数据
      this.$store.dispatch('initTodos');
    }
  }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>