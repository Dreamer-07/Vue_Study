<template>
    <h2>shallowReactive & shallowRef 的使用</h2>
    <p>{{m1}}</p>
    <p>{{m2}}</p>
    <p>{{m3}}</p>
    <p>{{m4}}</p>
    <button @click="updater">更新数据</button>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref, shallowReactive, shallowRef } from 'vue'
    export default defineComponent({
        name: 'App',
        setup() {

            const m1 = ref({
                name: 'ref',
                isDeep: true,
                info: {
                    A: '嵌套对象属性'
                }
            });

            const m2 = reactive({
                name: 'reactive',
                isDeep: true,
                info: {
                    A: '嵌套对象属性'
                }
            });

            const m3 = shallowRef({
                name: 'shallowRef',
                isDeep: false,
                info: {
                    A: '嵌套对象属性'
                }
            });

            const m4 = shallowReactive({
                name: 'shallowReactive',
                isDeep: false,
                info: {
                    A: '嵌套对象属性'
                }
            });

            const updater = () => {
                console.log(m1);
                // m1.value.name += "===";
                // m1.value.info.A += "===";

                // console.log(m2);
                // m2.name += "===";
                // m2.info.A += "===";

                console.log(m3); // 可以通过打印发现其 value 属性甚至不是一个 Proxy 对象
                // m3.value.name += "===";
                // m3.value.info.A += "===";
                // 对于 shallowRef() 创建的响应式数据，无论修改哪一层数据都不会发生视图更新，只有修改 .value 属性值才可以
                m3.value = {
                    name: 'shallowRef',
                    isDeep: false,
                    info: {
                        A: 'ともえちゃん可愛くなりたい'
                    }
                }


                // console.log(m4);
                // m4.name += "===";
                // 对于 shallowReactive() 创建的响应式数据，不会进行深度监视(更新第一层之外的数据不会更新视图)
                // m4.info.A += "===";
            }
            return {
                m1,
                m2,
                m3,
                m4,
                updater
            }
        }
    })
</script>