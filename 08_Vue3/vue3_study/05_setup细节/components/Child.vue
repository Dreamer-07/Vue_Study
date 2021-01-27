<template>
    <h2>Child</h2>
    <p>msg: {{msg}}</p>
    <p>title: {{title}}</p>
    <button @click="showByq">触发 byq 函数</button>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'Child',
        props: ['msg'],
        // beforeCrate() 生命钩子函数，该函数在创建组件实例前执行
        beforeCreate() {
            console.log('beforeCreate()方法调用了');
        },
        /* 
        setup 执行的时机：在 beforeCreate() 生命周期钩子函数之前执行了(且执行只执行一次)
            - 代表连对应的组件实例都未创建，this is undefined
            - 所以不可以通过 this 去访问 data/computed/props/methods 属性                
        */
        setup(props,context) {
            console.log("--------setup 的执行时机");
            console.log('setup()方法调用了',this); // undefined
            
            const showMsg = () => {
                console.log('setup 中的 showMsg 函数执行了');
                
            }

            /* 
            setup 的参数: props & context
                - props: 包含了配置的 props 数组中从父组件中获取的数据的对象
                - context：包含了 attrs、emit、expose、props、slots 的属性的对象
                    1. attrs: 获取当前子组件标签上的所有属性(包括 props 中没有配置获取的)
                    2. emit: 赋值调用分发事件的函数
                    3. expose: 不知道
                    4. props: 和第一个参数 props 相同
                    5. slots: 插槽
            */
            console.log("--------setup 参数");
            console.log(props,context);
            console.log(props.msg , context.attrs.msg2); //巴御前天下第一 巴御前！
            console.log(context.expose);
            
            const showByq = () => {
                context.emit('byq','通过 emit 调用分发事件')
            }

            /* 
            setup 的返回值
                一般 setup() 函数的返回值都是一个对象，html 模板可以直接访问其中的属性和方法
                    - 返回对象的属性会和 data 函数的返回值对象合并成为 vm 实例对象的属性
                    - 返回对象的方法会话 methods 中的函数合并成为 vm 实例对象的方法
                    - 注意：
                        1. 如果有重名的情况，setup() 优先(会导致 methods/data 报错：Duplicated key 'xxx')
                        2. 不建议混合使用 data/methods + setup
                        3. setup 不能是一个 async 修饰的函数，不然其的返回会变成 Promise 导致模板无法获取其中的数据
            */
            return {
                showMsg,
                showByq
            }
        },
        data() {
            return {
                title: 'OHHHH',
                // msg: '诶嘿嘿' // Duplicated key 'msg'
            }
        },
        methods: {
            // 会导致键重复报错
            // showMsg() {
            //     console.log('methods 中的 showMsg() 函数执行了'); 
            // }
            showMsg2() {
                console.log('methods 中的 showMsg2() 函数执行了');
            }
        },
        mounted() {
            console.log("--------setup 的返回值");
            
            console.log(this); //[[Target]].msg && [[Target]].title
            this.showMsg();
            this.showMsg2()
        }
    })
</script>