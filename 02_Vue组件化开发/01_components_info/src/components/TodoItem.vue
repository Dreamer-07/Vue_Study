<template>
    <!-- 
        enter & leave 和 over & out 的区别
            - 前者会在鼠标进入/离开元素时触发，进入子元素时不触发
            - 前者会在鼠标进入/离开元素时触发，进入子元素时也触发
     -->
    <li @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)" :style="{'background-color':bgColor}">
        <label>
            <input type="checkbox" v-model="isChoose"/>
            <span>{{todo.title}}</span>
        </label>
        <button class="btn btn-danger" v-show="isShow" @click="del()">删除</button>
    </li>
</template>

<script lang="ts">
    import PubSub from 'pubsub-js'
    export default {
        props: {
            todo: Object,
            index: Number
        },
        data(){
            return {
                bgColor: "white",
                isShow: false
            }
        },
        computed: {
            isChoose: {
                get() {
                    return (this as any).todo.isChoose;
                },
                set(newValue: boolean) {
                    (this as any).$emit('showbox',newValue,(this as any).index)
                }
            }
        },
        methods: {
            handleEnter(isEnter: boolean) {
                console.log(isEnter);
                if(isEnter){
                    (this as any).bgColor = "#aaa";
                    (this as any).isShow = true;
                }else{
                    (this as any).bgColor = "white";
                    (this as any).isShow = false;
                }
            },
            del() {
                const { todo , index } = ( this as any );
                if(window.confirm(`你确定删除${todo.title}的任务吗`)){
                    // 使用 PubSub.publish 进行消息发布
                    // 第一个参数对应的消息名,后面的参数为调用消息对应的回调函数时需要的形参
                    PubSub.publish('removeItem',index)
                } 
            }
        }
    }
</script>

<style>
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
        display: none;
        margin-top: 3px;
    }

    li:before {
        content: initial;
    }

    li:last-child {
        border-bottom: none;
    }
</style>