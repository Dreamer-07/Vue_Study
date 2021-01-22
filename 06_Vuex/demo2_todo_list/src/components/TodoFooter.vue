<template>
    <div class="todo-footer">
        <label>
            <input type="checkbox" v-model="selectAllBtn"/>
        </label>
        <span>
            <span>已完成{{completedCount}}</span> / 全部{{totalCount}}
        </span>
        <button class="btn btn-danger" v-show="totalCount" @click="removeCompleted">清除已完成任务</button>
    </div>
</template>

<script>
    import { mapGetters ,  mapActions } from 'vuex'
    export default {
        methods: {
            ...mapActions(['removeCompleted'])
        },
        computed: {
            ...mapGetters(['totalCount','completedCount']),
            selectAllBtn: {
                get () {
                    return this.$store.getters.selectAllBtn
                } ,
                set (check) {
                    this.$store.dispatch('selectAll',check)
                }
            }
        },
    }
</script>

<style>
    .todo-footer {
        height: 40px;
        line-height: 40px;
        padding-left: 6px;
        margin-top: 5px;
    }

    .todo-footer label {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
    }

    .todo-footer label input {
        position: relative;
        top: -1px;
        vertical-align: middle;
        margin-right: 5px;
    }

    .todo-footer button {
        float: right;
        margin-top: 5px;
    }
</style>