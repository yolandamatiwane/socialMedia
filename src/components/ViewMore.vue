<template>
    <div>
        <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal2">
            More Profile Details
        </button>

<!-- Modal -->
<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel2">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <slot name="profile"></slot>
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-dark">Save changes</button>
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
<style>
</style>
    