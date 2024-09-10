<template>
    <div>
        <button type="button" class="btn btn-custom" data-bs-toggle="modal" data-bs-target="#exampleModal5">
            <i id="cam" class="bi bi-camera-fill"></i>
        </button>

        <div class="modal fade" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel5" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel5">Upload PostUrl</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <slot name="addingPost"></slot>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
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
    .btn-custom{
        background-color: #a4d4a1;
        color: white;
        height: 90px;
        border-right:2px solid white;
    }

</style>