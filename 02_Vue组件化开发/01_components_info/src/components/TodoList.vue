<template>
    <ul class="todo-main">
        <todo-item v-for="(todo,index) in todos" :key="index" 
        :todo="todo" :index="index" @showbox="showbox"/>
    </ul>
</template>

<script lang="ts">
    import TodoItem from "./TodoItem.vue"
    export default {
        props: {
            todos: Array
        },
        components: {
            TodoItem
        },
        methods: {
            showbox(newValue: boolean,index: number){
                (this as any).todos[index].isChoose = newValue
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