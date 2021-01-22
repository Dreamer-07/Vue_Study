<template>
    <div class="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" 
            v-model="title" @keyup.enter="add"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: ''
            }
        },
        methods: {
            add(){
                // 1. 检验数据的合法性
                const title = this.title.trim();
                if(!title){
                    alert("请输入数据");
                    return;
                }
                // 2. 封装对象
                const todo = { title , isChoose: false};
                // 3. 分发 action,指定 actionName 和 参数
                this.$store.dispatch('addTodo',todo);
                // 4. 清空数据
                this.title = "";
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