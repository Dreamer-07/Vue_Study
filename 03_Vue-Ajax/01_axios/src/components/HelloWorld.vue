<template>
  <div class="hello">
    <h1>{{name}}</h1>
    <p v-if="!isShow">正在加载中 loading...</p>
    <p v-else>{{info}}</p>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  name: '巴御前添加第一！',
  props: {
    msg: String,
  },
  data () {
    return {
      isShow: ''
    }
  },
  // 在 mounted(挂载结束之后) 时发送 Ajax 请求数据
  mounted () {
    // 发送 get 请求
    axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
      //返回的是 Promise 对象, 使用 then() 方法进行处理
      .then(response => {(this as any).isShow = response.data.api})
      // 使用 catch 方法进行异常处理
      .catch(error => console.error(error));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
