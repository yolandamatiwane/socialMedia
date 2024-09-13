<template>
    <div id="table">
        <h5>Posts Table:</h5>
        
        <spinner-comp v-if="isLoading"/>
        <div v-else class="table-responsive-sm">
            <table class="table table-striped-custom" id="stylingT">
                <thead>
                    <tr>
                        <th>selected</th>
                        <th scope="col">PostID</th>
                        <th scope="col">UserID</th>
                        <th scope="col">Content</th>
                        <th scope="col">Url</th>
                        <th scope="col" colspan="2">Actions</th>
                    
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in posts" :key="post.post_id">
                        <td>
                            <input class="form-check-input" type="checkbox" :id="'checkbox-' + post.post_id" v-model="selectedPosts" :value="post.post_id">
                        </td>
                        <td>{{ post.post_id }}</td>
                        <td>{{post.user_id}}</td>
                        <td>{{post.content}}</td>
                        <td><img :src="post.url" id="postURL"></td>
                        <td><button class="btn btn-dark" @click.prevent="removePost(post.post_id)"><i class="bi bi-trash3-fill"></i></button></td>
                        <td>
                            <edit-comp :id="post.post_id" :fetchPostById="fetchPostById" >
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
                        </td>
                    </tr>
                </tbody>
                <button class="btn btn-dark" @click.prevent="deleteSelected"><i class="bi bi-trash3-fill"></i> Selected Users</button>
            </table>
        </div>
    </div>
</template>
<script>
import EditComp from '@/components/EditPostComp.vue'
import SpinnerComp from '@/components/SpinnerComp.vue'
import axios from 'axios';

export default {
    data(){
        return{
            user_id:undefined,
            content:undefined,
            url:undefined,
            post_id:undefined,
            selectedPosts:[],
            isLoading: true 
        }
    },
    components:{
        EditComp,
        SpinnerComp
    },
    computed:{
        posts(){
            return this.$store.state.posts
        }
    },
  methods:{
    async getPosts() {
        this.isLoading = true;
        try {
        await this.$store.dispatch('fetchPosts');
        } finally {
        this.isLoading = false;
        }
    },
    editPost(){
        this.$store.dispatch('updatePost',this.$data)
        this.getPosts()
    },
    removePost(id){
        this.$store.dispatch('deletePost',id)
        this.getPosts()
    },
    deleteSelected(){
        this.selectedPosts.forEach(postId => {
            this.$store.dispatch('deletePost',postId)
        })
        this.selectedPosts = []
        this.getPosts()
    },        
    async fetchPostById(id){
        let {data} = await axios.get(`https://socialmedia-3kos.onrender.com/posts/${id}`)
        console.log(data) 
        this.content = data.content
        this.post_id= data.post_id
        this.url = data.url
        this.user_id = data.user_id
    }
  },
  mounted() {
    this.getPosts()
  }
}
</script>
<style scoped>
    #stylingT button{
        width: 100%;
    }
    #stylingT th,td{
        background-color: #a4d4a1;
        font-size: bold;
        color: #36454F;
    }
    h5{
        color:white;
    }
    #postURL{
        width: 40%;
    }
    .table{
        width: 80%;

    }
    #table{
        margin-left: 70px;
        min-height: 100vh
        
    }
    @media(max-width:900px){
        .table{
            margin-left: 100px;
        }
    }
    @media (max-width:600px){
        .table{
            margin: 0px !important;
        }
    }
    @media(max-width:555px) {
     #table{
        margin-left: 0px !important;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    .table thead {
      display: none;
    }
    .table tr {
      display: block;
      margin-bottom: 10px;
      border: 1px solid #ddd;
    }
    .table td {
      display: block;
      text-align: right;
      font-size: 13px;
      border-bottom: 1px dotted #ccc;
      padding: 10px;
      position: relative;
    }
    .table td:before {
      content: attr(data-label);
      float: left;
      text-transform: uppercase;
      font-weight: bold;
    }
    .table td:last-child {
      border-bottom: 0;
    }
    .table td:nth-child(1):before {
      content: "Selected";
    }
    .table td:nth-child(2):before {
      content: "Post Id";
    }
    .table td:nth-child(3):before {
      content: "User Id";
    }
    .table td:nth-child(4):before {
      content: "Content";
    }
    .table td:nth-child(5):before {
      content: "Url";
    }
    .table td:nth-child(7):before {
      content: "Action";
    }
}
    
</style>