<template>
    <h2>toRef() 函数的使用</h2>
    <p>obj: {{obj}}</p>
    <p>name: {{name}}</p>
    <p>age: {{age}}</p>
    <button @click="updater">更新数据</button>
    <hr />
    <!-- 注意：组件间通信时使用 prop 的方式传递的是值而不是对象 -->
    <Child :name="name" />
</template>

<script lang="ts">
    import { defineComponent, ref, toRef } from 'vue'
    import Child from './components/Child.vue'
    export default defineComponent({
        name: 'App',
        setup() {
            const obj = {
                name: '巴御前',
                age: 16
            };
            /* 
            通过 toRef() 可以为指定的响应式对象上的某个属性创建一个 ref 对象
                - 二者内部操作的是同一份数据，更新时二者同步
            */
            const name = toRef(obj,'name');
            /* 
            也可以使用 ref 为指定的响应式对象上的某个属性创建一个 ref 对象 
                - 但这样二者内部操作的就不是同一份数据，更新时相互不影响
            */
            const age = ref(obj.age);

            // 更新函数
            const updater = () => {
                name.value += "!!!";
                age.value += 1;
            }
            return {
                obj,
                name,
                age,
                updater
            }
        },
        components: {
            Child
        }
    })
</script>