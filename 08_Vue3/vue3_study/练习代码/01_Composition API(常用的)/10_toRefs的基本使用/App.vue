<template>
  <h2>toRefs() 函数的使用</h2>
  <p>name: {{name}}</p>
  <p>info: {{info}}</p>
  <hr />
  <p>name2: {{name2}}</p>
  <p>info2: {{info2}}</p>
</template>

<script lang="ts">

  import { defineComponent, onMounted, reactive, toRefs } from 'vue'

  /* 模拟一个 hook 函数 */
  function useHook(){
    const M3 = reactive({
        name2: '巴御前',
        info2: 'あいしている'
      });
    return {
      title: '模拟 hook 函数',
      // 如果希望返回的数据不丢失响应式，且容易被使用，建议使用 toRefs()
      ...toRefs(M3)
    }
  }

  export default defineComponent({
    name: 'App',
    setup() {
      const M = reactive({
        name: '巴御前',
        info: 'あいしている'
      });
      
      /* 
        使用 toRefs() 函数将一个响应式对象转换为普通对象，该普通对象的所有属性都是 ref 类型的响应式数据
          - 主要作用于：当 hook 函数返回响应式对象时，可以在不丢失响应式的情况下将返回的对象进行分解使用
          - TS 中访问普通对象的属性时，注意是 ref 类型的
      */
      const M2 = toRefs(M);
      onMounted(() => {
        setInterval(() => {
          M.name += "!!!";
          console.log(M2); // {name: ObjectRefImpl, info: ObjectRefImpl} 
          // 由于属性的类型都是 ref，TS 中访问时需要使用 .value 
          M2.name.value += "!!!";
        },1000)
      })

      // 使用模拟的 hook 函数,使用解构赋值获取需要的数据
      const { name2 , info2 } = useHook()

      return {
        // M // 如果直接返回对象的话，模板中访问时还需要访问对象
        // ...M // 如果使用 ES6 中的 ...扩展运算符，由于 reactive 返回的响应式代理对象中的属性并非响应式数据，会导致无法进行视图更新
        ...M2,
        name2,
        info2
      }
    }
  })
</script>