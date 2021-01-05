<template>
  <div id="app">
    <mt-header title="导航栏" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-button type="default" @click.native="testToast">default</mt-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// 导入使用的 非标签组件
import { Toast,Header } from 'mint-ui'
export default {
  methods: {
    testToast() {
      Toast('巴御前天下第一!!');
    }
  },
  // 注冊局部組件
  components: {
    'mt-header': Header
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
