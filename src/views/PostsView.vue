<template>
    <div>
        <add-comp>
            <template #addingPost>
                <form>
                    <div class="mb-3">
                        <label for="exampleInputContent1" class="form-label">Content</label>
                        <input type="text" class="form-control" id="exampleInputContent1" v-model="content">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputUrl1" class="form-label">Url</label>
                        <input type="text" class="form-control" id="exampleInputUrl1" v-model="url">
                    </div>
                    <button class="btn btn-outline-dark" @click.prevent="addPost">Submit</button>
                </form>
            </template>
        </add-comp>
            <div class="card" v-for="post in posts" :key="post.post_id">
            <div class="card-header">
                {{ post.firstName }} {{ post.lastName }}
            </div>
            <div class="card-body">
                {{ post.content }}
            </div>

            <div class="card-footer">
                <div class="icons">
                    <button @click="navigateToPost(post.post_id)" class="btn">
                        <i class="bi bi-chat-dots"></i>
                    </button>
                    <i class="bi bi-heart-fill"></i>
                </div>

                <div class="dropdown" v-if="post.user_id == userId">
                    <button class="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots"></i>
                    </button>
                    {{ userId }}
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">
                            <button class="btn btn-outline-dark" @click.prevent="removePost(post.post_id)">Delete Post</button>
                        </a></li>
                        <li><a class="dropdown-item" href="#">
                        </a></li>
                    </ul>
                    <edit-comp>
                        <template #updatePost>
                            <form>
                                <div class="mb-3">
                                    <label for="exampleInputPostID1" class="form-label">PostID</label>
                                    <input type="text" class="form-control" id="exampleInputPostID1" v-model="post_id">
                                </div>
                                <!-- <div class="mb-3">
                                    <label for="exampleInputUserID1" class="form-label">UserID</label>
                                    <input type="text" class="form-control" id="exampleInputUserID1" v-model="user_id">
                                </div> -->
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
                </div>
            </div>
        </div>

        <!-- </div> -->
        
    </div>
</template>
<script>
import AddComp from '@/components/AddPostComp.vue'
import EditComp from '@/components/EditPostComp.vue'
export default {
    data(){
        return{
            content:undefined,
            url:undefined,
            post_id:undefined
        }
    },
    components:{
        EditComp,
        AddComp
    },
    computed:{
        posts(){
            return this.$store.state.posts
        },
        userId(){
            return localStorage.getItem('userId') 
        }
    },
    methods:{
        getPosts(){
            this.$store.dispatch('fetchPosts')
        },
        editPost(){
            this.$store.dispatch('updatePostLog',this.$data)
        },
        removePost(id){
            this.$store.dispatch('deletePostLog',id)
        },
        addPost(){
            this.$store.dispatch('addPost',{content:this.content, url:this.url})
        },
        navigateToPost(postID) {
            this.$router.push({name:'post', params:{id:postID}});
        }

    },
    mounted(){
        this.getPosts()

    }
    
}
</script>
<style scoped>
    .card{
        width: 50rem;
        height: 25rem;
        margin-top: 30px;
    }
    .card-body img{
        width: 100%;
        height: 200px;
    }
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