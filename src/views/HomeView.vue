
<template>
  <div>
    <section v-for="user in $store.state.users " :key="user.user_id">
      {{ user.user_id }}
      {{ user.firstName }}
    </section>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  methods:{
    getUsers(){
       this.$store.dispatch('fetchUsers')
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>
