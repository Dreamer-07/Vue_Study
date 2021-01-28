<template>
    <h2>Child</h2>
    <span>{{msg}}</span> <br />
    <button @click="msg=!msg">修改数据</button>
</template>

<script lang="ts">
    import { defineComponent, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue'
    export default defineComponent({
        name: 'App',
        // 使用 vue2 中的生命钩子函数
        beforeCreate() {
            console.log('vue2.x 中的 beforeCreate() 函数执行了');
        },
        created() {
            console.log('vue2.x 中的 created() 函数执行了');
        },
        beforeMount() {
            console.log('vue2.x 中的 beforeMount() 函数执行了');
        },
        mounted() {
            console.log('vue2.x 中的 mounted() 函数执行了');
        },
        beforeUpdate() {
            console.log('vue2.x 中的 beforeUpdate() 函数执行了');
        },
        updated() {
            console.log('vue2.x 中的 updated() 函数执行了');
        },
        // 在 vue3 中使用了 beforeUnmount & unmount 代替了 beforeDestroy & destroy
        beforeUnmount() {
            console.log('vue2.x 中的 beforeUnmount() 函数执行了');
        },
        unmounted() {
            console.log('vue2.x 中的 unmounted() 函数执行了');
        },
        
        setup() {
            console.log('vue3.0 中的 setup() 函数执行了'); // 组合 API 中使用 setup 代替了 beforeCreate() & created()
            
            const msg = ref(true)
            // 通过 vue3 的 Composition API 访问生命周期的钩子函数
            onBeforeMount(() => {
                console.log('vue3.0 的 onBeforeMount() 函数执行了');
            });
            onMounted(() => {
                console.log('vue3.0 的 onMounted() 函数执行了');
            });
            onBeforeUpdate(() => {
                console.log('vue3.0 的 onBeforeUpdate() 函数执行了');
            });
            onUpdated(() => {
                console.log('vue3.0 的 onUpdated() 函数执行了');
            });
            onBeforeUnmount(() => {
                console.log('vue3.0 的 onBeforeUnmount() 函数执行了');
            });
            onUnmounted(() => {
                console.log('vue3.0 的 onUnmounted() 函数执行了');
            });
            /* 
            总结：可以发现 vue3.0 的组合 API 都会早于 vue2.x 中的生命钩子函数执行
            */
            return {
                msg
            }
        }
    })
</script>