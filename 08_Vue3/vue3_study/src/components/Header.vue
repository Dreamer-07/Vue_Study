<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="name" @keyup.enter="add"/>
  </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";
    import { Todo } from '../types/Todo'
    export default defineComponent({
    name: "Header",
    props: {
        addTodo: {
            type: Function,
            required: true, //必须的
        },
    },
    setup(props) {
        const name = ref('')
        const add = () => {
            // 1. 获取文本框数据
            const newName = name.value;
            // 2. 判断数据
            if(!newName.trim()) return;
            // 3. 初始化数据
            const todo: Todo = {
                id: Date.now(),
                name: newName,
                isCompleted: false
            };
            // 4. 调用方法
            props.addTodo(todo)
            // 5. 恢复默认数据
            name.value = '';
        }
        return {
            name,
            add
        };
    },
    });
</script>

<style scoped>
/*header*/
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
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>