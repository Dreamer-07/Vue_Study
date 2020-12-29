<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- 可以使用单词小字母开头，多个单词间用-连接的格式使用组件 -->
      <todo-header :addItem="addItem"/>
      <todo-list :todos="todos"/>
      <todo-footer />
    </div>
  </div>
</template>

<script lang="ts">
  import TodoHeader from "./components/TodoHeader.vue"
  import TodoList from "./components/TodoList.vue"
  import TodoFooter from "./components/TodoFooter.vue"

  export default {
    data (){
      return {
        todos: [
          {title:"吃饭",isChoose: false},
          {title:"睡觉",isChoose: false},
          {title:"敲代码",isChoose: true}
        ]
      }
    },
    components: {
      TodoHeader,
      TodoList,
      TodoFooter
    },
    methods: {
      addItem(todo: {title: string;isChoose: boolean}){
        (this as any).todos.unshift(todo);
      }
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