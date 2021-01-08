<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <header>
    <!-- 定义路由链接 -->
    <router-link to="/home"> home </router-link> |
    <router-link to="/about"> About </router-link>
  </header>
  <!-- 用来显示当前路由组件的页面 -->
  <router-view></router-view>
</template>

<script lang="ts">
  export default {

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
  .router-link-active {
    color: red;
  }
</style>
