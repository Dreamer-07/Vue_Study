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

<script>
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
                    return this.todo.isChoose;
                },
                set(newValue) {
                    this.$store.dispatch('switchIsChoose',{
                        isChoose: newValue,
                        index: this.index
                    })
                }
            }
        },
        methods: {
            handleEnter(isEnter) {
                if(isEnter){
                    this.bgColor = "#aaa";
                    this.isShow = true;
                }else{
                    this.bgColor = "white";
                    this.isShow = false;
                }
            },
            del() {
                const { todo , index , $store } = ( this );
                if(window.confirm(`你确定删除${todo.title}的任务吗`)){
                    $store.dispatch('removeTodo',index)
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
        margin-top: 3px;
    }

    li:before {
        content: initial;
    }

    li:last-child {
        border-bottom: none;
    }
</style>