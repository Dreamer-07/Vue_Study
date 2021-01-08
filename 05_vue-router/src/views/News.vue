<template>
    <ul>
        <li v-for="(news,index) in newsArr" :key="index">
            {{news}}
        </li>
    </ul>
</template>

<script lang="ts">
    export default {
        data () {
            return {
                newsArr: [
                    'new01',
                    'new02',
                    'new03'
                ]
            }
        }
    }
</script>