<template>
    <ul class="todo-main">
        <todo-item v-for="(todo,index) in todos" :key="index" 
        :todo="todo" :index="index" @showbox="showbox"/>
    </ul>
</template>

<script lang="ts">
    import storageUtil from '../utils/storageUtil'
    import TodoItem from "./TodoItem.vue"
    import { mapState } from 'vuex'
    export default {
        computed : mapState(['todos']),
        components: {
            TodoItem
        },
        watch: {
            // 监视计算属性 todos
            todos: {
                deep: true, // 开启深度监视,
                handler: storageUtil.saveStorage
            }
        }
    }
</script>

<style>
    .todo-main {
        margin-left: 0px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding: 0px;
    }

    .todo-empty {
        height: 40px;
        line-height: 40px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding-left: 5px;
        margin-top: 10px;
    }
</style>