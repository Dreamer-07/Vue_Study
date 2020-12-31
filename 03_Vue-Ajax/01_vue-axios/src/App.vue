<template>
  <div v-if="!repoUrl">loading...</div>
  <div v-else>most star repo is <a :href="repoUrl">{{repoName}}</a></div>
</template>

<script lang="ts">
  export default {
    data(){
      return {
        repoUrl: '',
        repoName: ''
      }
    }
  }
</script>

<style>
</style>
