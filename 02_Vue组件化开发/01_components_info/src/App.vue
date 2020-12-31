<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- 1. 组件间通信 - 使用 props -->
      <!-- <todo-header :addItem="addItem" /> -->

      <!-- 2. 组件间通信 - 使用自定义事件1 -->
      <todo-header  @addItem="addItem" />
      
      <!-- 3. 使用 PubSub .JS 进行消息订阅和发布  -->
      <todo-list :todos="todos" />

      <!-- 4. 使用 slot -->
      <todo-footer>
        <!-- 使用 template 标签和 v-slot 指定传输对应的标签数据 -->
        <template #selectAll>
          <input type="checkbox" v-model="allChecked"/>
        </template>
        <template #info>
          <span>已完成{{completed}}</span> / 全部{{this.todos.length}}
        </template>
        <template #removeBtn>
          <button class="btn btn-danger" @click="removeCompleted">清除已完成任务</button>
        </template>
      </todo-footer>
    </div>
  </div>
</template>

<script lang="ts">
  import PubSub from "pubsub-js"
  import TodoHeader from "./components/TodoHeader.vue"
  import TodoList from "./components/TodoList.vue"
  import TodoFooter from "./components/TodoFooter.vue"

  export default {
    data (){
      return {
        /* 
        使用 localStorage 以 key-value 的格式保存 todos 数据
          - localStorage 存储 value 时都是以字符串的格式进行存储的(也就是 JSON 字符串)
          - 使用 JSON.parse 解析 JSON 字符串
          - 使用 || 防止首次加载数据为空导致报错
        */
        todos: JSON.parse(window.localStorage.getItem("todos_key") || '[]')
      }
    },
    computed: {
      completed (){
          /* 
          reduce() 会迭代数组的所有项，然后构建一个最终返回的值,从数组的第一项开始，逐个遍历到最后。 
              传给 reduce() 的函数接收 4 个参数：前一个值、当前值、项的索引和数组对象。
              这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数就是数组的第二项。
          reduce() 函数的第一个参数是处理数据的函数，第二个参数是初始值
          */
          return (this as any).todos.reduce((count: number,todo: {title: string; isChoose: boolean}) => count + (todo.isChoose ? 1 : 0),0)
      },
      allChecked: {
          get (){
              const _this = this as any
              return _this.todos.length === _this.completed && _this.completed > 0
          },
          set (value: boolean){
              (this as any).selectAll(value)
          }
      }
    },
    mounted() {
      // 进行消息订阅; 第一个参数为消息名，第二个参数为回调函数(所以用箭头函数)
      // 回调函数接收多个参数，第一个参数固定为 msg,后面的参数为消息发布时传入的参数
      PubSub.subscribe('removeItem',(msg: string,index: number) => {
        (this as any).removeItem(index);
      })
    },
    watch: {
      // 监视
      todos: {
        deep: true, //开启深度监视
        handler(value: []){
          // 在每次更新之后将新的数据保存到本地
          window.localStorage.setItem("todos_key",JSON.stringify(value));
        }
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