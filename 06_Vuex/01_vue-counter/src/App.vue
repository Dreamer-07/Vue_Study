<template>
  <main>
    <p>click {{count}} times,count is {{evenOrOdd}}</p>
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
    data () {
      return {
        count: 0
      }
    },
    computed : {
      evenOrOdd () {
        return (this as any).count % 2 === 0 ? '偶数' : '奇数';
      }
    },
    methods: {
      increment () {
        (this as any).count++;
      },
      decrement () {
        (this as any).count--;
      },
      incrementIfOdd () {
        (this as any).count % 2 === 0 ? (this as any).count++ : '';
      },
      incrementAsync () {
        setTimeout(() => {
          (this as any).count++;
        }, 1000);
      },
    },
  }
</script>

