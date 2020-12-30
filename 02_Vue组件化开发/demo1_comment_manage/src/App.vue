<template>
    <div>
        <header class="site-header jumbotron">
            <div class="container">
            <div class="row">
                <div class="col-xs-12">
                <h1>请发表对{{name}}的评论</h1>
                </div>
            </div>
            </div>
        </header>
        <div class="container">
            <Add :addComment="addComment" />
            <!-- 使用 data 数据属性名作为标签属性将父组件的数据传递给子组件(组件通信) -->
            <!-- 属性名建议和 data 数据属性相同，且如果需要传入 data 中的数据，还需要在前面加上: -->
            <List :comments="comments" :removeComment="removeComment"/>
        </div>
    </div>
</template>

<script lang="ts">
    import Add from "./components/Add.vue"
    import List from "./components/List.vue"
    export default {
        components: {
            Add,
            List
        },
        data() {
            return {
                name: "Vue",
                /* 存放 item 数据的数组对象 */
                comments: [
                    {
                        name: "TJH",
                        content: "欸嘿嘿嘿"
                    },
                    {
                        name: "SGL",
                        content: "欸嘿嘿hi"
                    },
                    {
                        name: "CGH",
                        content: "阿巴阿巴阿巴"
                    }
                ]
            }
        },
        methods: {
            addComment(comment: {name: string;content: string}){
                (this as any).comments.unshift(comment);
            },
            removeComment(index: number){
                (this as any).comments.splice(index,1);
            }
        }
    }
</script>

<style>

</style>