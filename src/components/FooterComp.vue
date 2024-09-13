<template>
    <footer>
    <h6>
      ComfortCorner &copy; {{ displayYear }}
    </h6> 
    <h6>follow us on <i class="bi bi-facebook" ></i></h6>
    </footer>
        
</template>
<script>
export default {
    data(){
    return {
      currentYear: new Date()
    }
  },
  computed:{
    displayYear(){
      return this.currentYear.getFullYear()
      }
    }
}
</script>
<style scoped>
  footer{
    color: #a4d4a1;
    background-color: #36454F;
    bottom: 0;
    position: relative;
    margin: auto;
  }
</style>