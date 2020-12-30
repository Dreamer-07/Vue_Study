<template>
   <div class="col-md-8">
        <h3 class="reply">评论回复：</h3>
        <h2 style='display: none'>暂无评论，点击左侧添加评论！！！</h2>
        <ul class="list-group">
            <!-- 将遍历出来的数据交给 item 组件进行处理 -->
            <Item v-for="(comment,index) in comments" :key="index" :comment="comment"
            :removeComment="removeComment" :index="index"/>
        </ul>
    </div>
</template>

<script>
    import Item from "./item"
    export default {
        // 声明接收属性: 这个属性会成为组件对象的属性
        // 组件对象：也就是 this，虽然不是 vm，但和 vm 实例对象的使用方法一致
        props: ['comments',"removeComment"], // 指定简略写法 - 只指定属性名
        components: {
            Item
        }
    };
</script>

<style>
    .reply {
        margin-top: 0px;
    }
</style>