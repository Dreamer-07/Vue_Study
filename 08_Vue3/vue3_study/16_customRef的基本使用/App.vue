<template>
    <h2>customRef</h2>
    <input type="text" v-model="inputText">
    <p>inputText: {{inputText}}</p>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import useDebounceRef from "./hooks/useDebounceRef"
    export default defineComponent({
        name: 'App',
        setup() {
            const inputText = useDebounceRef<string>('',500);
            return {
                inputText
            }
        }
    })
</script>