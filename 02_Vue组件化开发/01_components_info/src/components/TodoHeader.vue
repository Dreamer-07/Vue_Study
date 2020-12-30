<template>
    <div class="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" 
            v-model="title" @keyup.enter="add"/>
    </div>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                title: ''
            }
        },
        methods: {
            add(){
                const title = (this as any).title.trim();
                if(!title){
                    alert("请输入数据");
                    return;
                }
                const todo = { title , isChoose: false};
                // 使用 this.$emit 触发指定事件
                (this as any).$emit('addItem',todo);
                (this as any).title = "";
            }
        }
    }
</script>

<style>
    .todo-header input {
        width: 560px;
        height: 28px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 7px;
    }

    .todo-header input:focus {
        outline: none;
        border-color: rgba(82, 168, 236, 0.8);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }
</style>