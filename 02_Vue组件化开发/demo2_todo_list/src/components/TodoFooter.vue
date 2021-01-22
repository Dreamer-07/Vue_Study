<template>
    <div class="todo-footer">
        <label>
            <input type="checkbox" v-model="allChecked"/>
        </label>
        <span>
            <span>已完成{{completed}}</span> / 全部{{this.todos.length}}
        </span>
        <button class="btn btn-danger" @click="removeCompleted">清除已完成任务</button>
    </div>
</template>

<script lang="ts">
    export default {
        props: {
            todos: Array,
            // 删除已完成的的
            removeCompleted: Function,
            // 全选(全不选)
            selectAll: Function
        },
        computed: {
            completed (){
                /* 
                reduce() 会迭代数组的所有项，然后构建一个最终返回的值,从数组的第一项开始，逐个遍历到最后。 
                    传给 reduce() 的回调函数接收 4 个参数：前一个值、当前值、项的索引和数组对象。
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
        }
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