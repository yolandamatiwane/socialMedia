<template>
    <div class="container-fluid text-center" v-for="detail in user" :key="detail.user_id">
        <div id="back">
            <img :src="detail.background" id="backgroundImg">

        </div>
        <div  id="profileP" class="m-auto">
            <img class="img-fluid" :src="detail.profile" id="profile-image"/>
            <h3 class="userName">{{ detail.firstName }} {{ detail.lastName }}</h3>
            <p>You can't see me!</p>
                {{ detail.username }} <br>
                Contact me at {{ detail.email }}
                
            </div>
            <button class="btn btn-outline-custom">More Info</button> <button class="btn btn-outline-custom">Update Info</button>
            <div class="cards-container">
                <div class="card" v-for="content in post" :key="content.post_id">
                    {{ content.created_at }}
                    <br>
                    {{ content.content }}
                    <img v-if="content.url!=''" :src="content.url" class="card-img-bottom" id="postedImg">
                </div>
            </div>
        </div>
</template>
<script>
    export default{
        computed:{
            user(){
                return this.$store.state.user || []
            },
            post(){
                return this.$store.state.post || []
            }
        },
        methods:{
            getUser(){
                this.$store.dispatch('fetchUser')
            },
            getPost(){
                this.$store.dispatch('fetchPost')
            }
        },
        mounted(){
            this.getUser(),
            this.getPost()
        }
        
    }
</script>  
<style scoped>
    #profileP{
        width: 30rem;
        height: 200px;
        aspect-ratio: 1;
        position: relative;
        top: -6rem;
    }
    #profile-image{
        width: 8rem;
        border-radius: 50%;
        border: 5px solid rgb(11, 5, 53);
    }
    #backgroundImg{
        width: 100%;
        height: 200px;

    }
    /* h3{
        margin-top: 0%;
    } */
    .btn-outline-custom{
        background-color: transparent;
        font-weight: 600;
        color: rgb(4, 37, 19);
        border: 3px solid rgb(21, 53, 31);
    }
    .cards-container {
        display: flex;
        flex-wrap: wrap;
        
        justify-content: center; /* Center the cards horizontally */
        margin: 1rem auto;
    }
    .card{
        /* height: 80px; */
        width: 600px;
        color: rgb(4, 37, 19);
        border: 3px solid rgb(21, 53, 31);
        margin: auto;
    }
    #postedImg{
        height: 200px;
    }
</style>