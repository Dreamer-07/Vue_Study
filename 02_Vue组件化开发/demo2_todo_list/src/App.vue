<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- 可以使用单词小字母开头，多个单词间用-连接的格式使用组件 -->
      <todo-header :addItem="addItem" />
      <todo-list :todos="todos" :removeItem="removeItem"/>
      <todo-footer :todos="todos" :removeCompleted="removeCompleted" :selectAll="selectAll"/>
    </div>
  </div>
</template>

<script lang="ts">
  import TodoHeader from "./components/TodoHeader.vue"
  import TodoList from "./components/TodoList.vue"
  import TodoFooter from "./components/TodoFooter.vue"
  import storageUtil from "./utils/storageUtil"

  export default {
    data (){
      return {
        /* 
        使用 localStorage 以 key-value 的格式保存 todos 数据
          - localStorage 存储 value 时都是以字符串的格式进行存储的(也就是 JSON 字符串)
          - 使用 JSON.parse 解析 JSON 字符串
          - 使用 || 防止首次加载数据为空导致报错
        */
        todos: storageUtil.readStorage
      }
    },
    watch: {
      // 监视
      todos: {
        deep: true, //开启深度监视
        handler: storageUtil.saveStorage
        /* ~= handler:  function(todos: {title: string;isChoose: boolean}[]) {
                          window.localStorage.setItem(TODOS_KEY,JSON.stringify(todos))
                        } 
        */
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
        console.log((this as any).todos);
      },
      removeItem(index: number) {
        (this as any).todos.splice(index,1);
      },
      //更新任务，将所有已经完成的任务删除
      removeCompleted() {
        (this as any).todos = (this as any).todos.filter((todo: {isChoose: boolean; title: string}) => !todo.isChoose)
      },
      selectAll(check: boolean){
        (this as any).todos.forEach((todo: {isChoose: boolean; title: string}) => todo.isChoose = check);
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