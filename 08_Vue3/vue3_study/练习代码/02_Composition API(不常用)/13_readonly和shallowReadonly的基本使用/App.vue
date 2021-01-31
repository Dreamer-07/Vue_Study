<template>
    <h2>readonly和shallowReadonly的基本使用</h2>
    <p>state: {{state}}</p>
    <button @click="updater">更新数据</button>
</template>

<script lang="ts">
    import { defineComponent, reactive, readonly, shallowReadonly } from 'vue'
    export default defineComponent({
        name: 'App',
        setup() {
            const obj = {
                name: '测试嘞',
                childObj: {
                    name: '深度属性'
                }
            };
            /* 
            使用 readonly() 函数获取对应的只读代理对象
                - 接收一个 普通对象/响应式对象/ref 数据
                - 只读代理是深层的，任意层的 prop 都仅仅是只读的
            */
            // const state = readonly(obj);
            
            /* 
            使用 shallowReadonly() 函数获取对应的只读代理对象
                - 接收一个 普通对象/响应式对象/ref 数据
                - 只有最外层进行只读代理，额外的 prop 可以进行修改(不执行嵌套数据的只读转换)
            */
            const state = shallowReadonly(reactive(obj));

            function updater(){
                console.log(reactive(obj)); // 响应式代理对象
                console.log(state); // 只读代理对象

                // 报错：Cannot assign to 'name' because it is a read-only property.
                // state.name += "====";
                // 报错：Cannot assign to 'name' because it is a read-only property
                // state.childObj.name += "====";

                // 报错：Cannot assign to 'name' because it is a read-only property
                // state.name += "====";
                // 可以修改非最外层的数据
                state.childObj.name += "====";
            }

            return{
                state,
                updater
            }
        }
    })
</script>