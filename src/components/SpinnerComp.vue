<template>
    <div class="loading-overlay" v-if='isLoading'>
        <img src='https://yolandamatiwane.github.io/vueProjectImages/spinners/Animation%20-%201720183217052.gif' class='spinner'>
    </div>
    <div class='content' v-if='!isLoading'>

    </div>
</template>
<script>
export default {
  data(){
    return{
      isLoading:true
    }
  },
  mounted(){
    // loading time
    setTimeout(()=>{
      this.isLoading = false
    },2000)
  }
  
}
</script>

<style scoped>
  .loading-overlay{
    position: fixed;
    top: 0;
    left: 0;
    bottom:0;
    right:0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .spinner{
    width:100px;
    height: 100px;
  }
  
</style>