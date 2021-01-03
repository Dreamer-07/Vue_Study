<template>
    <section class="jumbotron">
      <h3 class="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text" placeholder="enter the name you search" v-model="searchName"/>
        <button @click="search">Search</button>
      </div>
    </section> 
</template>

<script lang="ts">
    import PubSub from 'pubsub-js'
    export default {
      data () {
        return {
          searchName: ''
        }
      },
      methods: {
        search () {
          const searchName  = (this as any).searchName.trim();
          if(searchName){
            // 发布消息
            PubSub.publish('search',(this as any).searchName)
          }
        }
      }
    }
</script>

<style>
    
</style>