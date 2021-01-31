<template>
  <h2>自定义 hook 函数操作</h2>
  <h3>案例1：收集用户点击的页面坐标</h3>
  <p>
    <span>x: {{x}}</span>
    <span>y: {{y}}</span>
  </p>
  <hr />
  <h3>案例2: 发送 Ajax 请求获取数据</h3>
  <p v-if="loading">正在加载中</p>

  <!-- 如果存在 length 属性就代表是数组 -->
  <ul v-else-if="data.length" v-for="item in data" :key="item.id">
    <h5>获取数组数据</h5>
    <li>id: {{item.id}}</li>
    <li>name: {{item.name}}</li>
    <li>price: {{item.price}}</li>
  </ul>
  
  <!-- 如果不存在就代表是对象 -->
  <ul v-else-if="data">
    <h5>获取对象数据</h5>
    <li>id: {{data.id}}</li>
    <li>city: {{data.city}}</li>
    <li>distance: {{data.distance}}</li>
  </ul>

  <p v-else>出错了！errorMsg: {{errorMsg}}</p>
</template>

<script lang="ts">
  // 1. 定义数据类型
  interface Address {
    id: string;
    city: string;
    distance: number;
  }
  interface Phone {
    id: string;
    name: string;
    price: number;
  }
  import { defineComponent } from 'vue'
  import useMousePosition from './hooks/useMousePosition'
  // 引入对应的 hook 函数
  import useRequest from './hooks/useRequest'
  export default defineComponent({
    name: 'App',
    setup() {
      const { x , y } = useMousePosition()
      /* 
      3. 在页面挂载结束时候发送请求获取数据
        - 根据请求的数据类型不同，传入对应的类型即可
      */
      // const { loading, data, errorMsg } = useRequest<Address>('data/address.json');
      const { loading, data, errorMsg } = useRequest<Phone[]>('data/phone.json');
      return {
        x,
        y,
        loading,
        data,
        errorMsg
      }
    }
  })
</script>