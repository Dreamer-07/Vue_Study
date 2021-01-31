<template>
  <h2>reactive 的基本使用 - 展示用户数据，点击按钮更新</h2>
  <p>{{user.name}}</p>
  <p>{{user.age}}</p>
  <p>{{user.identity}}</p>
  <button @click="updater">更新数据</button>
</template>


<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  setup() {
    const obj = {
      name: '诶嘿嘿',
      age: 17,
      identity: {
        name: '阿梓喵',
        id: '100 144 302 921',
        servants: ['T','J','H']
      }
    };
    /* 
    reactive() 函数的作用：定义响应式的引用数据
      - 通过 reactive() 函数传入一个引用对象，可以得到该引用对象的响应式代理对象
      - 响应式转换是 '深层的'，会影响原对象内部所有嵌套的属性
      - 返回的是一个 Proxy 的代理对象，而被代理的对象就是传入的对象
    */
    const user = reactive(obj);

    const updater = () => {
      // obj.identity.name = "哇嘎嘎嘎" // 即使有代理对象，直接修改原对象也是不能更新界面的
      user.name += '嘿嘿嘿'
      user.age++
      // 通过代理对象以下标的形式操作深度的数组属性
      user.identity.servants[0] = 'C'
      console.log(user) // Proxy
    };

    return {
      user,
      updater
    }
  }
});
</script>
