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
  flex-direction: column;
  min-height: 100vh;
  /* background-color: #36454F; */
}
#main-content {
  /* width: 100vw; */
  height: 100vh;
  margin-left: 300px;
  background-color: #36454F;

  /* margin-top: 10px; */
}
#main-content.no-margin {
  min-height: 100vh;
  /* width: 100vw; */
  margin: 0px;
  background-color: white;
}
@media(max-width:1300px){
  #main-content{
    width: 100%;
    margin-left: 250px;
  }
}
@media (max-width: 1100px){
  #main-content {
  width: 100%;
  margin-left: 200px;
  background-color: #36454F;
  }
}
@media(max-width:1000px){
  #main-content{
    margin-left: 200px;
  }
}
@media(max-width:900px){
  #appDiv{
    flex-direction: row-reverse;
  }
  #main-content{

  }
}
@media (max-width: 600px){
  #main-content {
  width: 100%;
  margin: 0px;
  background-color: #36454F;
}
#main-content.no-margin{
  margin: 0px;
}
}
</style>
