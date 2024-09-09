<template>
  <div id="appDiv">
    <nav-comp/>
    <div id="main-content" :class="{ 'no-margin': !hasToken }">
      <router-view/>
    </div>
  </div>
  <!-- <footer-comp/> -->
</template>

<script>
import NavComp from '@/components/NavComp.vue';
// import FooterComp from './components/FooterComp.vue';
  export default {
    components:{
      NavComp,
      // FooterComp
    }, computed:{
      token(){
        return this.$cookies.get('token');
      },
      hasToken() {
        return !!this.token; 
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
  color: #36454F;
}
#appDiv{
  display: flex;
  /* background-color: #36454F; */
}
#main-content {
  width: 100%;
  margin-left: 300px;
  /* margin-top: 10px; */
}
#main-content.no-margin {
  /* margin: 10px 100px; */
  margin-left: 210px;
}
</style>
