<template>
    <h2 :style="{color}">GrandSon 孙级组件</h2>
</template>

<script lang="ts">
    import { defineComponent, inject } from 'vue'
    export default defineComponent({
        name: 'GrandSon',
        setup() {
            // 通过 inject() 传入对应的数据标识即可得到对应的数据
            const color = inject('color');
            return {
                color
            }
        }
    })
</script>