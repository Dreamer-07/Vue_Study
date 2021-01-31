<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <Header :addTodo="addTodo" />
            <List :todos="todos" />
            <Footer :todos="todos" :updateTodos="updateTodos" :delAllCompletedTodos="delAllCompletedTodos" />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, provide, reactive, toRefs, watch } from "vue";
    // 导入组件
    import Header from "./components/Header.vue";
    import List from "./components/List.vue";
    import Footer from "./components/Footer.vue";
    // 导入类型约束
    import { Todo } from "./types/Todo";
    // 导入工具函数
    import { readTodos, saveTodos } from './utils/useLoaclStorageUtil'
    export default defineComponent({
    name: "App",
    components: {
        Header,
        List,
        Footer,
    },
    setup() {
        /* 
        - 使用数组存储多个 Item，用对象存储单个 Item - 定义响应式的展示数据
        - 定义 Todo 类型约束，防止数据被破坏
        */
        const state = reactive<{todos: Todo[]}>({
            // 初始化定义数组为空
            todos: [],
        });

        // 在页面挂载结束之后
        onMounted(() => {
            setTimeout(()=>{
                state.todos = readTodos();
            },1000);
        });

        // 定义添加数据的方法
        const addTodo = (todo: Todo) => {
            state.todos.push(todo)
        };
        // 定义修改所有 todo.isComplted 状态的方法
        const updateTodos = (check: boolean) => {
            state.todos.forEach(todo => todo.isCompleted = check)
        }
        // 定义删除所有已完成的任务的 todo
        const delAllCompletedTodos = () => {
            state.todos = state.todos.filter(todo => !todo.isCompleted);
        };
        // 定义删除数据的方法
        const delTodo = (index: number) => {
            state.todos.splice(index, 1)
        };
        // 定义修改 todo.isCompleted 状态的方法
        const updateTodo = (todo: Todo, isCompleted: boolean) => {
            todo.isCompleted = isCompleted;
        }

        // 深度监听 state.todos 数组，如果发生数据变化，就调用方法保存到游览器缓存
        watch(() => state.todos, saveTodos, {deep: true});

        // 注册函数
        provide('delTodo',delTodo);
        provide('updateTodo',updateTodo);
        return {
            // 使用 toRefs 将内部的数据全部转换成 ref 后，使用 ...暴露出去
            ...toRefs(state),
            addTodo,
            updateTodos,
            delAllCompletedTodos
        };
    },
    });
</script>

<style scoped>
/*app*/
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