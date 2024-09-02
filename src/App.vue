<template>
  <nav>
    <div v-if="token">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/profile" >Profile</router-link> |
      <!-- <router-link to="/logout">Logout</router-link> -->
      <button @click="logOut()" class="btn btn-dark">LogOut</button>

    </div>
    <div v-else>
      <router-link to="/login">Login</router-link>|
      <router-link to="/register">Register</router-link>
    </div>
  </nav>
  <router-view/>
</template>

<script>
  export default {
    computed:{
      token(){
        return this.$cookies.get('token');
      }
    },
    methods: {
      async logOut(){
        this.$cookies.remove('token')
        await this.$router.push('/login')
        location.reload()

      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
