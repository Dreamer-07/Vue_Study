<template>
    <div class="todo-footer">
        <!-- 使用 slot 完成组件通信(传输标签数据) -->
        <label>
            <!-- <input type="checkbox" v-model="allChecked"/> -->
            <slot name="selectAll"></slot>
        </label>
        <span>
            <!-- <span>已完成{{completed}}</span> / 全部{{this.todos.length}} -->
            <slot name="info"></slot>
        </span>
        <!-- <button class="btn btn-danger" @click="removeCompleted">清除已完成任务</button> -->
        <slot name="removeBtn"></slot>
    </div>
</template>

<script lang="ts">
    export default {
    }
</script>

<style>
    .todo-footer {
        height: 40px;
        line-height: 40px;
        padding-left: 6px;
        margin-top: 5px;
    }

    .todo-footer label {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
    }

    .todo-footer label input {
        position: relative;
        top: -1px;
        vertical-align: middle;
        margin-right: 5px;
    }

    .todo-footer button {
        float: right;
        margin-top: 5px;
    }
</style>