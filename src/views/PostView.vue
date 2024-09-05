<template>
    <div v-if="post">
        <div class="card">
            <div class="card-header">
                {{ post.post_id }}
                {{ content }}
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
        POSTING(){
            return this.$store.state.single
        }
    },
    methods:{
        async getSinglePost(){
            const post = this.$store.dispatch('fetchPostById', this.postId)
            this.post = post
        }
    },
    mounted(){
        this.getSinglePost()
    }
    
}
</script>
<style>
    
</style>