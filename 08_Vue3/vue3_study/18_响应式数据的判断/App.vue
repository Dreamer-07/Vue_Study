<template>
    <h2>响应式数据的判断</h2>
</template>

<script lang="ts">
    import { defineComponent, isProxy, isReactive, isReadonly, isRef, reactive, readonly, ref, shallowReactive, shallowReadonly, shallowRef } from 'vue'
    export default defineComponent({
        name: 'App',
        setup() {
            // 1. `isRef` 判断一个值是否为 Ref 对象
            console.log(isRef(ref({}))); // true
            console.log(isRef(shallowRef({}))); // true

            // 2. `isReactive` 判断一个值是否是由 reative() 创建的响应式代理对象
            console.log(isReactive(reactive({}))); // true
            console.log(isReactive(shallowReactive({}))); // true

            // 3. `isReadonly` 判断一个值是否是由 readonly() 创建的只读代理对象
            console.log(isReadonly(readonly({}))); // true
            console.log(isReadonly(shallowReadonly({}))); // true

            // 4. `isProxy` 判断一个值是否是由 reactive() / readonly() 创建的 Proxy 对象
            console.log(isProxy(reactive({}))); // true
            console.log(isProxy(readonly({}))); // true
            console.log(isProxy(shallowReadonly({}))); // true
            return {
                
            }
        }
    })
</script>