<template>
    <div>
        <button @click="callParentMethod(id)" type="button" class="btn btn-custom" data-bs-toggle="modal" data-bs-target="#exampleModal1">
            Edit Profile
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel1">Update Profile Details</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot name="content"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        fetchUserById:{
            type:Function,
            required:true
        },
        id:{
            type:Number,
        }
    },
    methods: {
        callParentMethod(param) {
        // Call the method passed from the parent
        this.fetchUserById(param);
    }
}
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
    /* height: 100vh; */
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