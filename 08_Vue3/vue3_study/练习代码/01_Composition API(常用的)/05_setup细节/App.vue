<template>
  <h2>App</h2>
  <p>msg: {{msg}}</p>
  <button @click="updater">修改数据</button>
  <hr />
  
  <Child :msg="msg" msg2="巴御前！" @byq="byq"/>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Child from './components/Child.vue'
  export default defineComponent({
    name: 'App',
    setup() {
      const msg = ref('巴御前天下第一');
      const updater = () => {
        msg.value += "!!"
      }
      const byq = (text: string) => {
        console.log(text);
      }
      return {
        msg,
        updater,
        byq
      }
    },
    // 注册子组件
    components: {
      Child
    }
  })
</script>