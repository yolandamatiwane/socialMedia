<template>
  <div>
    <button type="button" class="btn btn-custom" data-bs-toggle="modal" data-bs-target="#exampleModal2">
      More Details
    </button>
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <!-- <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel2">More User Details</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div> -->
            <div class="modal-body">
              <slot name="profile"></slot>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
  .modal-content{
    color:#36454F;
    align-content: center;
  }
  .modal-header{
    align-content: center;
    background-color: #a4d4a1;
  }
  .modal-body{
    /* background-image: url('https://yolandamatiwane.github.io/socialMediaImg/viewMore.jpg');
    background-size:cover;
    background-position: center;
    background-repeat: no-repeat; */
    background-color: #a4d4a1;
    height: 100vh;
  }
.btn-custom{
  background-color: #a4d4a1;
  color: white;
  margin-right: 10px;
}
.btn-custom:hover{
  border: 2px solid #a4d4a1;
  background-color: white;
  color: #a4d4a1;
}
</style>
    