<template>
  <div>
      <img alt="Vue logo" src="./assets/logo.png">
      <header>
        <!-- 定义路由链接 -->
        <router-link to="/home"> Home </router-link> |
        <router-link to="/about"> About </router-link>
      </header>
      <!-- 用来显示当前路由组件的页面 -->
      <router-view msg="巴御前天下第一！！" v-slot="{ Component }">
        <!-- 可以通过 keep-alive 标签缓存路由组件对象 -->
        <keep-alive include="about,home">
          <component class="view" :is="Component" />
        </keep-alive>
      </router-view>
  </div>

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
