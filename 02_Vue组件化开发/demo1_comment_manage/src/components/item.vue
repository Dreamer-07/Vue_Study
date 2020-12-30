<template>
    <li class="list-group-item">
        <div class="handle">
            <a href="javascript:;" @click="remove">删除</a>
        </div>
        <p class="user"><span>{{comment.name}}</span><span>说:</span></p>
        <p class="centence">{{comment.content}}</p>
    </li>
</template>

<script lang="ts">
    export default {
        props: { //声明接收属性(完整写法)：指定属性名和属性值的类型
            comment: Object,
            removeComment: Function,
            index: Number
        },
        methods: {
            remove(): void {
                const {comment,removeComment,index} = (this as any);
                /* 使用模板字符串 */
                if(window.confirm(`你确定删除${comment.name}的评论吗`)){
                    removeComment(index);
                }
            }
        }
    }
</script>

<style>
    li {
        transition: .5s;
        overflow: hidden;
    }

    .handle {
        width: 40px;
        border: 1px solid #ccc;
        background: #fff;
        position: absolute;
        right: 10px;
        top: 1px;
        text-align: center;
    }

    .handle a {
        display: block;
        text-decoration: none;
    }

    .list-group-item .centence {
        padding: 0px 50px;
    }

    .user {
        font-size: 22px;
    }
</style>