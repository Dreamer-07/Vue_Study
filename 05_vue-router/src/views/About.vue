<template>
    <h2>About</h2>
    <div>
        <span>{{msg}}</span>
        <br />
        <input type="text" name="byq"/>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'about',
        props: {
            msg: String
        }
    }
</script>