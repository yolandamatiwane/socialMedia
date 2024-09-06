<template>
    <div v-if="post">
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
            <div>
                {{ $store.state.comments }}
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            post:null
        }
    },
    computed:{
        postId(){
            return this.$route.params.id
        },
        comment(){
            return this.$store.state.comments
        }
    },
    methods:{
        async getSinglePost(){
            await this.$store.dispatch('fetchPostById', this.postId)
            this.post = this.$store.state.single
        },
        async getComments(){
            await this.$store.dispatch('fetchComments', this.postId)
        }
    },
    mounted(){
        this.getSinglePost(),
        this.getComments()
    }
    
}
</script>
<style scoped>
.card img{
    width: 100%;
    height:300px;
}
    
</style>