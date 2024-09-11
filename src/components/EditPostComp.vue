<template>
    <div class="edit">
        <button @click="callParentMethod(id)" type="button" class="btn btn-custom" data-bs-toggle="modal" data-bs-target="#exampleModal3">
            <i class="bi bi-pencil-square"></i>
        </button>

        <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel3">Editing Post details</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot name="updatePost"></slot>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-outline-dark">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        fetchPostById:{
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
        this.fetchPostById(param);
    }
}
}
</script>
<style scoped>
    .btn-custom{
        color: rgb(7, 0, 0);
        height: 5px;
    }
    .edit{
        position: relative;
        bottom: 12px;
    }
</style>