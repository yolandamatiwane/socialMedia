<template>
    <div>
        {{ $store.state.user }}

    </div>
</template>
<script>
</script>
    methods:{
        getUser(){
        this.$store.dispatch('fetchUser')
        }
    },
    mounted() {
        this.getUser()
    }
<style>
</style>