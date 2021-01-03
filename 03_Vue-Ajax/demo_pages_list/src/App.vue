<template>
  <div class="container">
    <Search />
    <user-main />
  </div>
</template>

<script lang="ts">
  import Search from './components/Search.vue'
  import Main from './components/Main.vue'
  export default {
    components: {
      Search,
      UserMain: Main
    }
  }
</script>

<style>
  
</style>
