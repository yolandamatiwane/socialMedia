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
        <div class="flex-container">
            <modal-comp>
                 <template #content>
                     <form>
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
                    <h4>Welcome {{ detail.firstName }}</h4>
                   <label>First Name:</label>{{ detail.firstName }}
                   <label>Surname:</label>{{ detail.lastName }}
                   <label>Age:</label>{{ detail.age }}
                   <label>Gender:</label> {{ detail.gender }}
                   <label>Username:</label>{{ detail.username }}
                   <label>Email:</label>{{ detail.email }}
                   <label>This account was created at</label>{{ detail.created_at }}
                    <h5>Would you liike to make some changes to the above details?</h5>
                    <button>Update Profile Details</button>
                </template>
                 
            </view-comp>
        </div>    
                
        <div class="cards-container">
            <div class="card" v-for="content in post" :key="content.post_id">
                {{ content.created_at }}
                <br>
                {{ content.content }}
                <img v-if="content.url!=null" :src="content.url" class="card-img-bottom" id="postedImg">
            </div>
        </div>
        <button @click="removeUser" class="btn btn-outline-dark">Delete Account</button>
    </div>

</template>
<script>
import ModalComp from '@/components/EditpComp.vue';
import ViewComp from '@/components/ViewMore.vue';
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
                gender:undefined
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
                await location.reload()
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
        height: 250px;
        width: 600px;
        color: rgb(4, 37, 19);
        border: 3px solid rgb(21, 53, 31);
        margin: auto;
    }
    #postedImg{
        height: 200px;
    }
    .flex-container {
        display: flex;
        
    }
</style>