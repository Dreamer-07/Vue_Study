<template>
    <div class="col-md-4">
        <form class="form-horizontal">
            <div class="form-group">
                <label>用户名</label>
                <input type="text" class="form-control" placeholder="用户名" v-model="name">
            </div>
            <div class="form-group">
                <label>评论内容</label>
                <textarea class="form-control" rows="6" placeholder="评论内容" v-model="content"></textarea>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="button" class="btn btn-default pull-right" @click="add">提交</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                name: '',
                content: ''
            }
        },
        props: {
            // 定义接收数据属性的详细属性
            addComment: {
                // 指定类型
                type: Function,
                // 是否具有必要性，默认为 false
                required: true
            }
        },
        methods: {
            add() {
                // 1. 校验数据
                const name = this.name.trim();
                const content = this.content.trim();
                if(!name || !content){
                    alert('确保输入的值不为空');
                    return;
                }
                // 2. 封装数据
                const comment = { name,content };
                // 3. 添加到 App 组件的 comments 数组中
                this.addComment(comment);
                // 4. 恢复默认值
                this.name = '';
                this.content = '';
            }
        }
    };
</script>

<style>

</style>