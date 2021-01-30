<template>
    <h2>Child 子组件</h2>
    <p>name: {{name}}</p>
    <p>length: {{length}}</p>
</template>

<script lang="ts">
    import { defineComponent, toRef } from 'vue'
    // 导入一个 hook 函数
    import useRefValueLength from "../hooks/useRefValueLength"
    export default defineComponent({
        name: 'App',
        props: {
            name: {
                type: String,
                requried: true // 是否是必要的
            }
        },
        setup(props) {
            // 将 props 中的属性转换为 ref 类型后传递给 hook 函数得到需要的数据
            const length = useRefValueLength(toRef(props,'name'))
            return {
                length
            }
        }
    })
</script>