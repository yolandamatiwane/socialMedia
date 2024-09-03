<template>
    <div>
        <h5>Posts Table</h5>
        <div class="table-responsive-sm">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">PostID</th>
                    <th scope="col">UserID</th>
                    <th scope="col">Content</th>
                    <th scope="col">Url</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in posts" :key="post.post_id">
                        <td>{{ post.post_id }}</td>
                        <td>{{post.user_id}}</td>
                        <td>{{post.content}}</td>
                        <td>{{ post.url }}</td>
                        <td><button class="btn btn-dark">Delete Post</button></td>
                        <td>
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
                                        <button type="submit" class="btn btn-dark" @submit.prevent="updatePost()">Submit</button>
                                    </form>
                                </template>
                            </edit-comp>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h5>Users</h5>

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
    }
  },
  mounted() {
    this.getPosts()
  }
}
</script>
<style>
    
</style>