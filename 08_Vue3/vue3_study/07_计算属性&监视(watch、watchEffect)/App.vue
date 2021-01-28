<template>
  <h2>计算属性和监视</h2>
  <fieldset>
    <legend>用户输入</legend>
    姓氏：<input type="text" placeholder="请输入姓氏" v-model="user.firstName" /> <br />
    名字：<input type="text" placeholder="请输入名字" v-model="user.lastName" /> <br />
  </fieldset>
  <fieldset>
    <legend>数据显示</legend>
    计算属性get:      <input type="text" placeholder="计算属性get" v-model="fullName" /> <br />
    计算属性get/set:  <input type="text" placeholder="计算属性get/set" v-model="fullName2"/> <br />
    监视watch显示:    <input type="text" placeholder="监视watch显示" v-model="fullName3"/> <br />
  </fieldset>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue'
  export default defineComponent({
    name: 'App',
    setup() {
      const user = reactive({
        firstName: '巴',
        lastName: '御前'
      });
      /* 
      computed() 函数的使用：返回一个计算属性
        - 如果只传入一个函数，代表对应计算属性的 get() 方法
        - 可以传入一个对象，对象中有对应的 get和set 方法
      */
      const fullName = computed(() => {
        return user.firstName + " " + user.lastName
      });
      const fullName2 = computed({
        get(){
          return user.firstName + " " + user.lastName
        },
        set(val: string){
          const names = val.split(" ");
          user.firstName = names[0];
          user.lastName = names[1];
        }
      });

      /* 
      watch() 函数的使用：完成对指定数据的监视
        - 第一个参数为要监视的属性，可以使用 [] 监视多个属性
        - 第二个参数对应监视的回调函数
        - 第三个为监视的配置(深度监视，初始化调用一次等)
        注意：如果监视的不是响应式数据的话需要使用箭头函数
      */
      const fullName3 = ref('')
      watch(user,({firstName,lastName}) => {
        fullName3.value = firstName + " " + lastName
      },{
        deep: true, // 开启深度监视
        immediate: true // 初始化调用一次监视函数
      })
      // 监视非响应式数据时 - 需要使用回调函数
      watch([()=>user.firstName,()=>user.lastName],([firstName,lastName]) => {
        console.log(firstName,lastName);
      })

      /* 
      watchEffect() 函数：完成对指定数据的监视
        - 默认会执行一次，用于收集依赖
        - 会自动收集依赖，只要回调函数中引用了响应式的属性
          当这些属性发生变动时，回调就会执行的
        - 无法获取旧的值
      */
      watchEffect(()=>{
        console.log('watcgEffect');
        const names = fullName3.value.split(" ");
        user.firstName = names[0];
        user.lastName = names[1];
      })
      return {
        user,
        fullName,
        fullName2,
        fullName3
      }
    }
  })
</script>