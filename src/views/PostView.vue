<template>
    <div v-if="post" id="main">
        <div class="card">
            <div class="card-header">
                {{ post.post_id }}
            </div>
            <div class="card-body">
                {{ post.content }}
                <img v-if="post.url" :src="post.url" alt="Post Image">
            </div>
            <div class="icons">
                    <button class="btn">
                        <i class="bi bi-chat-dots"></i>
                    </button>
                    <i class="bi bi-heart-fill"></i>
            </div>
        </div>
        
        <div class="card" v-for="comment in comments" :key="comment.comment_id">
            <div class="card-header">
                {{ comment.comment_id }}

            </div>
            <div class="input-group" v-if="userId == comment.user_id">
                <div class="card-body">
                    {{ comment.comment_text }}
                </div>
                <div class="btn-group-vertical" role="group" aria-label="Vertical button group">    
                    <edit-comp>
                        <template #editComm>
                            <form>
                                <!-- <div class="mb-3">
                                    <label for="exampleInputCommentId1" class="form-label">CommentId</label>
                                    <input type="text" class="form-control" id="exampleInputCommentId1" v-model="comment_id">
                                </div> -->
                                <div class="mb-3">
                                    <label for="exampleInputComment1" class="form-label">Comment</label>
                                    <input type="text" class="form-control" id="exampleInputComment1" v-model="comment_text">
                                </div>
                                <button class="btn btn-outline-dark" @click.prevent="editComment(comment.comment_id)">Submit</button>
                            </form>
                        </template>
                    </edit-comp>
                    <button type="button" class="btn btn-dark" @click="deletComment(comment.comment_id)"><i class="bi bi-x-square"></i></button>
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
                <button class="btn btn-dark" @click="addCommment()"><i class="bi bi-send-plus-fill"></i></button>
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
#main{
    
}
.card img{
    width: 100%;
    height:300px;
}
.card{
    width:30rem;
}
.commentArea{
    display: flex;
    /* height: 30px; */
    width: 100%;
}
/* .commentArea button{
    height: fit-content;
    align-self: center;
} */
.commentArea .mb-3{
    width: 100%;  
}
/* .btn-group-vertical{
    right: 0;
} */

</style>