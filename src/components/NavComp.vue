<template>
  <nav v-if="token">
    <div>
      <div class="navLogo">
        <h2>ComfortCorner</h2>
      </div>
      <router-link to="/home">
        <h4>
          <i class="bi bi-house-door-fill"></i>
          Home
        </h4>
      </router-link> 
      <router-link to="/about">
        <h4>
          <i class="bi bi-info-circle"></i>
          About
        </h4>
      </router-link> 
      <router-link to="/posts">
        <h4>
          <i class="bi bi-file-text"></i>
          Posts
        </h4>
      </router-link>
      <router-link to="/profile">
        <h4>          
          <i class="bi bi-person-lines-fill"></i>
          Profile
        </h4>
      </router-link> 
      <div v-if="isAdmin">
        <router-link to="/admin">
          <h4>
            <i class="bi bi-gear"></i>
            Admin
          </h4>
        </router-link>
      </div>
        <button @click="logOut()" class="btn btn-dark"><i class="bi bi-box-arrow-right"></i> LogOut</button>
      </div>
  </nav>
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
        this.$cookies.remove('role')
        await this.$router.push('/login')
        location.reload()

      }
    }
  }
</script>

<style scoped>
  .navLogo{
    height:120px;
  }
  nav {
  width: 20%;
  height: 100%;
  position: fixed; 
  top: 0; 
  left: 0; 
  bottom: 0;
  padding: 30px;
  background-color: #A4D4A1;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 

}
nav div{
  display: flex;
  flex-direction: column;
}

nav a {
  font-weight: bold;
  color: white;
  height: 65px;
  text-decoration: none;
  font-weight: 900;
}

nav a.router-link-exact-active {
  /* color: #7A9D6E; */
  color: #36454F;
  border-radius: 5px;
  /* background-color: rgba(255, 255, 255, 0.432); */
  font-weight: 900;
}

/* mobile */
/* @media (max-width: 768px) {
  nav {
    width: 100%;
    height: auto;
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    box-shadow: none;
  }

  nav div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; 
  }

  nav a {
    font-size: 14px; 
    padding: 10px; 
  }

  .navLogo {
    height: auto;
    margin-bottom: 10px;
  }
} */

</style>