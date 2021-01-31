<template>
  <li @mouseenter="mouseHandler(true)" @mouseleave="mouseHandler(false)"
    :style="{backgroundColor: bgColor, color: myColor}">
    <label>
      <input type="checkbox" v-model="isCompleted"/>
      <span>{{ todo.name }}</span>
    </label>
    <button class="btn btn-danger" v-if="isShow" @click="removeTodo">删除</button>
  </li>
</template>

<script lang="ts">
    import { computed, defineComponent, inject, ref } from "vue";
    // 引入类型
    import { Todo } from '../types/Todo'
    export default defineComponent({
        name: "Item",
        props: {
            todo: {
                type: Object as () => Todo, // 使用回调函数确定类型
                required: true
            },
            index: {
                type: Number,
                required: true
            }
        },
        /* 
        注意：这里不要使用解构赋值,会导致获取的数据失去响应性
        */
        setup(props) {
            // 背景色
            const bgColor = ref('white');
            // 前景色
            const myColor = ref('black');
            // 按钮显示
            const isShow = ref(false);
            // DOM 回调函数
            const mouseHandler = (flag: boolean) => {
                if(flag){
                    bgColor.value = 'pink';
                    myColor.value = 'green';
                    isShow.value = true;
                }else{
                    bgColor.value = 'white';
                    myColor.value = 'black';
                    isShow.value = false;
                }
            };
            // 通过 inject 获取 App 组件中的函数
            const delTodo = inject('delTodo') as Function;
            const updateTodo = inject('updateTodo') as Function;
            // 删除函数
            const removeTodo = () => {
                if(confirm(`你确定删除${props.todo.name}吗`)){
                    delTodo(props.index);
                }
            }
            // 定义单选框(是否完成)计算属性
            const isCompleted = computed({
                get(){
                    return props.todo.isCompleted;
                },
                set(val){
                    updateTodo(props.todo,val);
                }
            })
            return {
                mouseHandler,
                removeTodo,
                bgColor,
                myColor,
                isShow,
                isCompleted
            }
        }
    });
</script>

<style scoped>
    /*item*/
    li {
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }

    li label {
        float: left;
        cursor: pointer;
    }

    li label li input {
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }

    li button {
        float: right;
        margin-top: 3px;
    }

    li:before {
        content: initial;
    }

    li:last-child {
        border-bottom: none;
    }
</style>