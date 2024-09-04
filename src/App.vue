<template>
  <div id="appDiv">
    <nav>
    <div v-if="token">
      <router-link to="/">Home</router-link> 
      <router-link to="/about">About</router-link> 
      <router-link to="/post">Posts</router-link>
      <router-link to="/profile" >Profile</router-link> 
      <div v-if="isAdmin">
        <router-link to="/admin">Admin</router-link>
      </div>

      <button @click="logOut()" class="btn btn-dark">LogOut</button>

    </div>
    <div v-else>
      <router-link to="/login">Login</router-link>|
      <router-link to="/register">Register</router-link>
    </div>
    </nav>
  <router-view/>
  </div>
</template>

<script>
  export default {
    computed:{
      token(){
        return this.$cookies.get('token');
      },
      isAdmin(){
        return this.$cookies.get('role') == 'admin'
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
#appDiv{
  display: flex;
}

nav {
  width: 33%;
  padding: 30px;
}
nav div{
  display: flex;
  flex-direction: column;
}

nav a {
  font-weight: bold;
  color: #05553a;
  /* height: 90px; */
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #032d1a;
  border-radius: 20px;
  /* background-color: #05553a33; */
}
</style>
