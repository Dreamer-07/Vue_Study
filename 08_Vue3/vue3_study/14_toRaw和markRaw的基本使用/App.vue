<template>
    <h2>toRaw和markRaw的基本使用</h2>
    <p>obj: {{obj}}</p>
    <button @click="toRawUpdate">使用 toRaw 修改数据</button> <br />
    <button @click="markRawUpdate">使用 markRaw 修改数据</button>
</template>

<script lang="ts">
    import { defineComponent, markRaw, reactive, toRaw } from 'vue'
    interface UserInfo{
        name: string;
        age: number;
        childObj?: {name: string};
    }
    export default defineComponent({
        name: 'App',
        setup() {
            const eido = {
                name: 'toRaw和markRaw的基本使用',
                age: 17
            };
            const obj = reactive<UserInfo>(eido)
            /* 
            通过 toRaw() 返回响应式对象对应的普通的对象
                - 操作普通对象时，即使数据变化，界面也不会更新
                - 转换后的对象和转换前的对象是同一个
            */
            function toRawUpdate() {
                console.log('toRawUpdate()...');
                const testObj = toRaw(obj);
                // 操作普通对象时，即使数据变化，界面也不会更新
                testObj.name += "====";
                // 转换后的对象和转换前的对象是同一个
                console.log(eido == testObj,testObj); // true {...}
            }
            /* 
            通过 markRaw() 可以标记一个原始对象，使其无法再成为响应式对象
                - 返回对象本身
            */
            function markRawUpdate() {
                console.log('markRawUpdate()...');
                const childObj = {
                    name: '哔哩哔哩'
                };
                // 标记一个原始对象，使其无法成为响应式对象
                // childObj = markRaw(childObj)
                obj.childObj = childObj;
                setInterval(() => {
                    if(obj.childObj){
                        console.log("-----");
                        obj.childObj.name += "====";
                        console.log(obj,obj.childObj);
                    }
                },1000)
            }
            return {
                obj,
                toRawUpdate,
                markRawUpdate
            }
        }
    })
</script>