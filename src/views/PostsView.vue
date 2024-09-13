<template>
    <div class="mainCard">
        <div id="AddingPost">
            <div class="input-group mb-3">
                <!-- <div > -->
                    <textarea class="form-control" placeholder="What are you thinking?" v-model="content" id="textArea" rows="3"></textarea>
                    <!-- <input type="text" class="form-control" id="exampleInputContent1" placeholder="What are you thinking?" v-model="content"> -->
                <!-- </div> -->
                <add-comp>
                    <template #addingPost>
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputUrl1" class="form-label">Url</label>
                                <input type="text" class="form-control" id="exampleInputUrl1" v-model="url">
                            </div>
                        </form>
                    </template>
                </add-comp>
                <button class="btn btn-custom" @click="addPost()"><i class="bi bi-send-plus-fill"></i></button>
            </div>
        </div>

        <LoadingOverlay :isLoading="isLoading"/>
        <div class="card" v-for="post in posts" :key="post.post_id">
            <div class="card-header">
                <div>
                  <img :src="post.profile" id="userImage">
                  {{ post.firstName }} {{ post.lastName }}
                </div>
                <div>
                  <i class="bi bi-three-dots"></i>
                </div>
              </div>
            <div class="card-body">
                {{ post.content }}
                <!-- <img :src="post.url" class="fit-bottom" id="bodyImg"> -->
            </div>

            <div class="card-footer">
                <div>
                  <i id="like-icon" class="bi bi-heart-fill"></i> <label>Like</label>
                  <button @click="navigateToPost(post.post_id)" class="btn">
                    <i class="bi bi-chat-dots-fill"></i>
                    <label>comments</label>
                  </button>
                  <i class="bi bi-send-fill"></i>
                </div>
                <div id="edit">
                  <i id="book" class="bi bi-bookmark-fill"></i>
                    <edit-comp :id="post.post_id" :fetchPostById="fetchPostById" v-if="post.user_id == userId">
                                <template #updatePost>
                                    <form>
                                        <div class="mb-3">
                                            <label for="exampleInputPostID1" class="form-label">PostID</label>
                                            <input type="text" class="form-control" id="exampleInputPostID1" v-model="post_id">
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
                    <button id="edi" class="btn" v-if="post.user_id == userId" @click.prevent="removePost(post.post_id)"><i class="bi bi-trash3-fill"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AddComp from '@/components/AddPostComp.vue'
import EditComp from '@/components/EditPostComp.vue'
import LoadingOverlay from '@/components/SpinnerComp.vue'
import axios from 'axios';
export default {
    data(){
        return{
            content:undefined,
            url:undefined,
            post_id:undefined,
            isLoading: true
        }
    },
    components:{
        EditComp,
        AddComp,
        LoadingOverlay
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
        async getPosts(){
            try{
                await this.$store.dispatch('fetchPosts')
            } finally{
                this.isLoading = false
            }
        },
        editPost(){
            this.$store.dispatch('updatePostLog',this.$data)
            this.getPosts()
        },
        removePost(id){
            this.$store.dispatch('deletePostLog',id)
            this.getPosts()
        },
        addPost(){
            this.$store.dispatch('addPost',{content:this.content, url:this.url})
            this.getPosts()
        },
        navigateToPost(postID) {
            this.$router.push({name:'post', params:{id:postID}});
        },
        async fetchPostById(id){
            let {data} = await axios.get(`http://localhost:2107/posts/${id}`)
            console.log(data) 
            this.content = data.content
            this.post_id= data.post_id
            this.url = data.url
        }
    },
    mounted(){
        this.getPosts()

    }
    
}
</script>
<style scoped>
    .mainCard{
        width: 100%;
        background-color: #36454F;
    }
    form{
        color: #36454F;
    }
    #userImage{
        width:40px;
        border-radius: 50%;
    }
    .card{
        width: 60%;
        margin: 20px auto;
        border: none;
        /* color: white */
    }

    .card-body img{
        width: 100%;
        height: 200px;
    }
    .card-header,.card-footer{
        background-color: #36454F;
        color: white;
        text-align:start;
        display: flex;
        justify-content: space-between;
        /* background-color: #a4d4a1; */
    }
    .btn{
        color: white;
    }
    .icons i{
        padding: 10px;
    }
    .dropdown .btn{
        height: 30px;
        text-align:center;
        color: white;

    }
    .dropdown-toggle::after {
        display: none;
    }
    #edit{
        display: flex;
    }
    #edi{
        position: relative;
        bottom: 7px;
    }
    .btn-custom{
        background-color: #a4d4a1;
    }
    #AddingPost .input-group{
        width: 100% !important;
        align-self: center;
    }

    #AddingPost{
        margin: 10px 120px 50px;
    }
    @media(max-width:900px){
        .mainCard{
            margin-left:50px;
        }
        #AddingPost{
            
        }
    }
    @media(max-width:600px){
        .mainCard{
            margin-left:0px;
        }
        #AddingPost{
            margin: auto;
        }
        .card{
            margin-bottom: 10px;
            /* margin: auto; */
            width: 90%;
        }
        label{
            display: none;
        }
    }

</style>