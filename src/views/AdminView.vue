<template>
    <div id="table">
        <h5>Posts Table</h5>
        <div class="table-responsive-sm">
            <table class="table">
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
            </table>
            <button class="btn btn-dark" @click.prevent="deleteSelected">Delete Selected Users</button>
        </div>
    </div>
</template>
<script>
import EditComp from '@/components/EditPostComp.vue'
import axios from 'axios';

export default {
    data(){
        return{
            user_id:undefined,
            content:undefined,
            url:undefined,
            post_id:undefined,
            selectedPosts:[]
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
        let {data} = await axios.get(`http://localhost:2107/posts/${id}`)
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
    #postURL{
        width: 18%;
    }
    .table{
        width: 80%;

    }
    #table{
        margin-left: 70px;
    }
    
    @media (max-width:600px){
        #table{
            margin: 0px !important;
        }
    }
    @media(max-width:555px) {
    table {
        font-size: 12px;
        margin: auto;
        border-collapse: separate;
        border-spacing: 0;
    }

    th, td {
        padding: 10px; 
        display: block;
        width: 100%;
        box-sizing: border-box; 
    }

    tr {
        border-bottom: 1px solid #ddd; 
    }

    th {
        background-color: #F0F0F0;
        border-bottom: 2px solid #ccc;
    }
}
    
</style>