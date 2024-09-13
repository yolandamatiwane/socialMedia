<template>
    <div class="container-fluid text-center" v-for="detail in user" :key="detail.user_id">
        <div id="top-half">
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
            <div class="flex-container">
                <modal-comp :id="detail.user_id" :fetchUserById="fetchUserById">
                    <template #content>
                        <form>
                            {{ console.log(detail.user_id) }}
                            <div class="mb-3">
                                <label for="exampleInputName1" class="form-label">First Name:</label>
                                <input type="text" class="form-control" v-model="firstName" id="exampleInputName1">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputSurname1" class="form-label">Surname</label>
                                <input type="text" class="form-control" v-model="lastName" id="exampleInputSurname1">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputAge1" class="form-label">Age</label>
                                <input type="text" class="form-control" v-model="age" id="exampleInputAge1">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputUsername1" class="form-label">Username</label>
                                <input type="text" class="form-control" v-model="username" id="exampleInputUsername1">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" v-model="email"  id="exampleInputEmail1">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" v-model="password" id="exampleInputPassword1">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputRole1" class="form-label">Role</label>
                                <input type="role" class="form-control" v-model="role" id="exampleInputRole1">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputProfile1" class="form-label">Profile Url</label>
                                <input type="profile" class="form-control" v-model="profile" id="exampleInputProfile1">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputBackground1" class="form-label">Background Url</label>
                                <input type="background" class="form-control" v-model="background" id="exampleInputBackground1">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputGender1" class="form-label">Gender</label>
                                <input type="gender" class="form-control" v-model="gender" id="exampleInputGender1">
                            </div>
                        <button class="btn btn-outline-dark" @click.prevent="updateProfile()">Save Changes</button>
                        <button class="btn btn-outline-dark" type="reset">Clear</button>
                        </form>
                    </template>
                </modal-comp>
                <view-comp>
                    <template #profile>
                        <div class="header">
                            <img :src="detail.profile" id="viewImg">
                            <h4>{{ detail.firstName }} {{ detail.lastName }}</h4>
                        </div>
                    <div id="info">
                        <h5><label>First Name:</label> {{ detail.firstName }}</h5>
                        <h5><label>Surname:</label>  {{ detail.lastName }}</h5>
                        <h5><label>Age:</label>  {{ detail.age }}</h5>
                        <h5><label>Gender:</label>  {{ detail.gender }}</h5>
                        <h5><label>Username:</label>  {{ detail.username }}</h5>
                        <h5><label>Email:</label>  {{ detail.email }}</h5>
                        <h6><label>This account was created at</label> {{ detail.created_at }}</h6>
                    </div>
                        <!-- <h5>Would you liike to make some changes to the above details?</h5> -->
                    <div id="footer">
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        <button class="btn btn-dark" >Update Profile Details</button>
                    </div>
                    <button @click="removeUser" class="btn btn-custom">Delete Account</button>
                    </template>    
                </view-comp>
                <button class="btn btn-custom"><i class="bi bi-person-add"></i></button>
            </div> 
        </div>
        <div class="cards-container">
            <h6>{{ detail.firstName }}'s Posts:</h6>
            <div class="card" v-for="content in post" :key="content.post_id">
                <div class="card-header">
                    <i class="bi bi-three-dots"></i>
                </div>
                <div class="card-body">
                    {{ content.content }}

                    <!-- <img v-if="content.url!=null" :src="content.url" class="card-img-bottom" id="postedImg"> -->
                </div>
                <div class="card-footer">
                    <div class="left">
                        <i class="bi bi-heart-fill" @click="toggleLike" :style="{ color: isLiked ? '#a4d4a1' : '' }"></i>
                        <i class="bi bi-chat-dots-fill"></i>
                        <i class="bi bi-send-fill"></i>
                    </div>
                    <div>
                        <i id="book" class="bi bi-bookmark-fill"></i>
                        <i class="bi bi-trash3-fill"></i>
                    </div>
                </div>
                <!-- {{ content.created_at }} -->
            </div>
        </div>
 
    </div>

</template>
<script>
import ModalComp from '@/components/EditpComp.vue';
import ViewComp from '@/components/ViewMore.vue';
import axios from 'axios';
    export default{
        data(){
            return{
                firstName: undefined,
                lastName: undefined,
                age: undefined,
                username:undefined,
                email:undefined,
                password:undefined,
                role:undefined,
                profile:undefined,
                background:undefined,
                gender:undefined,
                isLiked:false
            }
        },
        components:{
            ModalComp,
            ViewComp
        },
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
            },
            removeUser(){
                this.$store.dispatch('removeUser')
                .then(() => {
                    this.$router.push('/login')
                });
            },
            async updateProfile(){
                this.$store.dispatch('updateProfile',this.$data)
                this.getUser()
            },        
            async fetchUserById(id){
                console.log(id)
                let {data} = await axios.get(`http://localhost:2107/users/user/${id}`)
                console.log(data.firstName) 
                this.firstName = data.firstName
                this.lastName = data.lastName
                this.age = data.age
                this.username = data.username
                this.email = data.email
                this.password = data.password
                this.role = data.role
                this.profile = data.profile
                this.background = data.background
                this.gender = data.gender
            },
            toggleLike() {
                this.isLiked = !this.isLiked;
            }
        },
        mounted(){
            this.getUser(),
            this.getPost()
        }
        
    }
</script>  
<style scoped>
    .cards-container .card-header{
        background-color: #36454F;
        color: white;
    }
    .cards-container .card-footer{
        background-color: #36454F;
        display: flex;
        justify-content: space-between;
        color: white;
    }
    /* .cards-container .card{
        margin: auto;
    } */
    i{
        margin: 5px;
    }
    .card{
        margin-bottom: 30px;
        border: 2px solid #a4d4a1;
    }
    .header{
        display: flex;
        height: 60px;
        border-bottom: 3px solid #36454F;
    }
    .header h5{
        align-self: center;
        /* justify-content; */
    }
    .container-fluid{
        color: white;
    }
    #top-half{
        color:white;
    }
    #profileP{
        width: 30rem;
        height: 200px;
        aspect-ratio: 1;
        position: relative;
        top: -6rem;
    }
    #info{
        margin-top: 50px;
        padding: auto;
        font-weight: 500;
    }
    #profile-image{
        width: 8rem;
        border-radius: 50%;
        border: 5px solid #36454F;
    }
    #backgroundImg{
        width: 100%;
        height: 200px;

    }
    .btn-outline-custom{
        background-color: transparent;
        font-weight: 600;
        color: rgb(4, 37, 19);
        border: 3px solid rgb(21, 53, 31);
    }
    .cards-container {
        margin: 1rem;
    }
    .form-control{
        border: 2px solid #36454F;
        color: #36454F;
    }
    #postedImg{
        height: 200px;
    }
    .flex-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btn-custom{
        background-color: #a4d4a1;
        color: white;
    }
    .btn-custom:hover{
        border: 2px solid #a4d4a1;
        background-color: white;
        color: #a4d4a1;
    }
    #viewImg{
        width: 50px;
        justify-self: center;
        border-radius: 50%;
        margin-right: 40px;
    }
    #footer{
        margin-top:280px;
    }
    @media (max-width: 767px) {
        #profileP {
            width: 100%;
            top: -3rem;
        }

        .btn-custom {
            margin-top: 10px;
        }
        
        .cards-container {
            margin: 1rem 0;
        }
  }
</style>