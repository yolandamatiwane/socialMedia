<template>
    <div>
        <button class="btn btn-outline-dark">Add Post</button>
        <div class="card" v-for="post in posts" :key="post.pos_id">
            <div class="card-header">
                {{ post.post_id }}
            </div>
            <div class="card-body">
                {{ post.content }}
            </div>

            <div class="card-footer">
                <div class="icons">
                    <i class="bi bi-chat-dots"></i>
                    <i class="bi bi-heart-fill"></i>
                </div>

                <div class="dropdown">
                    <button class="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">
                            <button class="btn btn-dark" @click.prevent="removePost(post.post_id)">Delete Post</button>
                        </a></li>
                        <li><a class="dropdown-item" href="#">
                            <edit-comp>
                                <template #updatePost>
                                    <form>
                                        <div class="mb-3">
                                            <label for="exampleInputPostID1" class="form-label">PostID</label>
                                            <input type="text" class="form-control" id="exampleInputPostID1" v-model="post_id">
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputUserID1" class="form-label">UserID</label>
                                            <input type="text" class="form-control" id="exampleInputUserID1" v-model="user_id">
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputContent1" class="form-label">Content</label>
                                            <input type="text" class="form-control" id="exampleInputContent1" v-model="content">
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputUrl1" class="form-label">Url</label>
                                            <input type="text" class="form-control" id="exampleInputUrl1" v-model="url">
                                        </div>
                                        <button class="btn btn-dark" @click.prevent="editPost()">Submit</button>
                                    </form>
                                </template>
                            </edit-comp>
                        </a></li>
                    </ul>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import EditComp from '@/components/EditPostComp.vue'
export default {
    data(){
        return{
            user_id:undefined,
            content:undefined,
            url:undefined,
            post_id:undefined
        }
    },
    components:{
        EditComp
    },
    computed:{
        posts(){
            return this.$store.state.posts
        }
    },
    methods:{
        getPosts(){
            this.$store.dispatch('fetchPosts')
        },
        editPost(){
        this.$store.dispatch('updatePost',this.$data)
    },
    removePost(id){
        this.$store.dispatch('deletePost',id)
    }

    },
    mounted(){
        this.getPosts()

    }
    
}
</script>
<style scoped>
    .card-footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .icons i{
        padding: 10px;
    }
    .dropdown .btn{
        height: 30px;
        text-align:center;

    }
    .dropdown-toggle::after {
        display: none;
    }
</style>