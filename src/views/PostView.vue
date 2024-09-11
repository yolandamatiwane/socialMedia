<template>
    <div id="color">
        <div class="card-group" id="main">
        <div v-if="post"  class="card">
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
                <!-- <img v-if="post.url" :src="post.url" alt="Post Image"> -->
            </div>
            <div class="card-footer">
                <div>
                  <i class="bi bi-heart-fill"></i> Like
                  <button @click="navigateToPost(post.post_id)" class="btn">
                    <i class="bi bi-chat-dots-fill"></i>
                    comments
                  </button>
                  <i class="bi bi-send-fill"></i>
                </div>
                <div>
                  <i class="bi bi-bookmark-fill"></i>
                </div>
              </div>
            
        </div>
        
        <div id="comment" class="card" v-for="comment in comments" :key="comment.comment_id">
            <div class="card-header">
                <div>
                    <img :src="comment.profile" id="userImage">
                    {{ comment.firstName }} {{ comment.lastName }}
                </div>
                
            </div>
            <div class="input-group" v-if="userId == comment.user_id">
                <div class="card-body">
                    {{ comment.comment_text }}
                </div>
                <div class="btn-group" role="group" aria-label="Vertical button group">    
                    <edit-comp>
                        <template #editComm>
                            <form>
                                <div class="mb-3">
                                    <label for="exampleInputComment1" class="form-label">Comment</label>
                                    <input type="text" class="form-control" id="exampleInputComment1" v-model="comment_text">
                                </div>
                                <button class="btn btn-outline-dark" @click.prevent="editComment(comment.comment_id)">Submit</button>
                            </form>
                        </template>
                    </edit-comp>
                    <button type="button" class="btn btn-custom" @click="deletComment(comment.comment_id)"><i class="bi bi-trash3-fill"></i></button>
                </div>
            </div>
            <div v-else>
                <div class="card-body">
                    {{ comment.comment_text }}
                </div>
            </div>
        </div>
        <div class="commentArea">
            <div class="input-group mb-3">
                <textarea class="form-control" placeholder="add your comment here..." v-model="comment_text" id="textArea" rows="3"></textarea>
                <button class="btn btn-custom" @click="addCommment()"><i class="bi bi-send-plus-fill"></i></button>
            </div>
        </div>
        
        </div>
    </div>
</template>
<script>
import EditComp from '@/components/EditCommentComp.vue'
export default {
    data(){
        return{
            post:null,
            comment_text:null,
            comment_id:null
        }
    },
    components:{
        EditComp
    },
    computed:{
        postId(){
            return this.$route.params.id
        },
        comments(){
            return this.$store.state.comments
        },
        userId(){
            return localStorage.getItem('userId') 
        }
    },
    methods:{
        async getSinglePost(){
            await this.$store.dispatch('fetchPostById', this.postId)
            this.post = this.$store.state.single
        },
        async getComments(){
            await this.$store.dispatch('fetchComments', this.postId)
        },
        async addCommment(){
            await this.$store.dispatch('addComment',{post_id:this.postId,comment_text:this.comment_text})
        },
        async editComment(commentId){
            await this.$store.dispatch('updateComment', {comment_id: commentId,post_id:this.postId,comment_text:this.comment_text})
        },
        async deletComment(commentId){
            await this.$store.dispatch('deleteComment', {comment_id:commentId})
        }    
    },
    mounted(){
        this.getSinglePost(),
        this.getComments()
    }
    
}
</script>
<style scoped>
#color {
    background-color: #36454F;
    width: 100%;
    min-height: 100vh !important; 
    margin: 0; 
    padding: 0; 
    bottom: 0;
}
.card img{
    width: 100%;
    height:300px;
}
/* #comment{
    height: 10px !important;
} */
.card{
    width:30rem;
    border: none;
}
.commentArea{
    display: flex;
    /* height: 30px; */
    width: 100%;
}

.commentArea .mb-3, #main .card{
    width: 70%;  
    margin: 5px 150px;
}

#main{
    background-color: #36454F;
    display:flex;
    flex-direction: column;
    /* min-height: 100vh; */
    
}

.card-header,.card-footer{
    background-color: #36454F;
    color: white;
    text-align:start;
    display: flex;
    justify-content: space-between;
    /* border: none; */
    /* background-color: #a4d4a1; */
}
.card-body{
    align-items: center;
    height: 40px;
    /* color: white; */
}
#comment #userImage{
    width: 20px;
    height: 20px;
    /* background-color: #36454F; */
}

#userImage{
    width:60px;
    height:60px;
    border-radius: 50%;
}
.btn-custom{
    background-color: #a4d4a1;
    border: none;
    color: white;
}
</style>