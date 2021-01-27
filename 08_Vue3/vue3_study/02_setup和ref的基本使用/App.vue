<template>
  <h2>setup 和 ref 的使用 - 实现点击按钮修改数据</h2>
  <p>{{count}}</p>
  <button @click="updater">增加 count</button>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  // 组件名
  name: 'App',
  // vue2 中的写法
  // data () {
  //   return {
  //     count: 0
  //   }
  // },
  // methods: {
  //   updater () {
  //     this.count++
  //   }
  // }

  // vue3 的写法
  // 定义 setup() 函数，该函数是组合 API 的入口函数
  setup() {
    // let count = 0; // 普通的变量

    /* 
    使用 ref() 函数设置响应式数据：
      - ref() 函数可以定义一个响应式数据，返回一个 Ref 的对象，该对象中有一个 value 属性
        TS/JS 可以通过该属性访问数据
      - 但 html 模板中可以不访问 value，直接访问 Ref 对象即可
      - 通常用来定义一个 "基本类型" 的响应式数据
    */
    const count = ref(0)
    function updater () {
      // 如果不设置响应式数据，那么及时数据修改了，视图也不会更新
      console.log(count);
      count.value++;
    }
    // 如果返回一个对象，那么模板中可以直接访问其中的属性/方法
    return {
      count,
      updater
    }
  }
});
</script>
