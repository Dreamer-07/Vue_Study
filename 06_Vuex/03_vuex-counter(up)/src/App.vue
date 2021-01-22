<template>
  <main>
    <p>click {{count}} times,count is {{evenOrOdd2}}</p>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementIfOdd">increment if odd</button>
      <button @click="incrementAsync">increment async</button>
    </div>
  </main>
</template>

<script lang="ts">
  /* 
  导入 vuex 辅助函数
    导入的 mapXxxx 函数都是返回一个对象，对象中具有指定的数据属性
      - 如果不需要定义局部的属性，可以直接将其赋值给对应的属性
      - 如果需要定义局部的属性，就需要使用 ...(对象/数组 展开运算符) 将对象的属性展开保存到当前对应的对象
  */
  import { mapState,mapGetters,mapActions } from 'vuex'
  export default {
    // 不要使用 data，因为不会得到数据，而是得到函数对象的字符串
    // 需要定义局部的属性，使用 ... 将 map辅助函数的返回结果 => computed
    computed : { 
      // 当映射的属性名和 store 中定义的相同时，可以直接传入一个字符串数组
      ...mapState(['count']),
      // 当映射的属性名和 store 中定义的不同时，就需要传入一个对象
      ...mapGetters({
        // 映射的属性名: store 中定义的
        evenOrOdd2: 'evenOrOdd'
      },),
      local () {
        return '局部变量';
      }
    },
    // 如果不需要定义局部的属性，直接将 map辅助函数的返回结果 => methods
    methods: mapActions(['increment','decrement','incrementIfOdd',"incrementAsync"]),
  }
</script>

