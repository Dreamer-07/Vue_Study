<template>
  <main>
    <p>click {{$store.state.count}} times,count is {{$store.getters.evenOrOdd}}</p>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementIfOdd">increment if odd</button>
      <button @click="incrementAsync">increment async</button>
    </div>
  </main>
</template>

<script lang="ts">
  export default {
    methods: {
      increment () {
        // 通过 $store.dispatch 分发 action
        (this as any).$store.dispatch('increment')
      },
      decrement () {
        // 通过 $store.dispatch 分发 action
        (this as any).$store.dispatch('decrement')
      },
      incrementIfOdd () {
        // 通过 $store.dispatch 分发 action
        (this as any).$store.dispatch('incrementIfOdd')
      },
      incrementAsync () {
        // 通过 $store.dispatch 分发 action
        (this as any).$store.dispatch('incrementAsync')
      },
    },
  }
</script>

