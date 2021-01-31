<template>
  <h2>ref 和 reactive 的细节问题</h2>
  <p>m1: {{m1}}</p>
  <p>m2: {{m2}}</p>
  <p>m3: {{m3}}</p>
  <p>m3.servant: {{m3.servant}}</p>
  <button @click="updater">更新</button>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  export default defineComponent({
    name: 'App',
    setup() {
      /* 
      总结：
        1. Vue3 的 composition Api 中的两个响应式 Api(ref & reactive)
        2. ref 用来数据基本数据类型，reactive 用来处理引用数据类型
        3. 但 ref 也可以用来处理引用数据，
           内部会自动使用 reactive 将 value 属性转换为对应的代理对象
        4. ref 内部(基本数据类型)会给 value 属性添加对应的 get/set 进行数据劫持
        5. reactive 内部使用 Proxy 实现对对象内部数据的劫持，并通过 Reflect 操作源对象内部数据
        6. 即使 ref 内部的 value 是 Proxy ，在模板中也不需要通过 .value 访问，直接访问属性名即可
      */
      // 通过 ref 创建基本数据类型的响应式数据
      const m1 = ref('巴御前！');
      // 通过 reactive 创建引用数据类型的响应式数据
      const m2 = reactive({
        name: 'test1',
        servant: {
          info: 'saber'
        }
      });
      // 通过 ref 创建引用数据类型的响应式数据
      const m3 = ref({
        name: 'test2',
        servant: {
          info: 'Archer'
        }
      });
      // 通过 reactive 无法创建基本数据类型的响应式数据
      // const m4 = reactive('test3') // rgument of type 'string' is not assignable to parameter of type 'object'

      const updater = () => {
        m1.value += "!!";
        m2.name = 'test2';
        // 通过 ref 创建的引用数据的响应式数据访问时仍要加上 .value 
        m3.value.servant.info = "Lancer";
        // 内部仍会进行深度监视
        console.log(m3.value,m3.value.servant); //Proxy{name: "test2",servant: {…}} Proxy{info: "Lancer"}
      }
      
      return {
        m1,
        m2,
        m3,
        updater
      }
    },
    mounted() {
      console.log(this);
    }
  })
</script>