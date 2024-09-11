<template>
    <div class="container text-center">
        <div class="row">
        <div class="col-12 col-sm-6">
            <form>
                <h5>SignUp</h5>
                <div id="name">
                    <div class="mb-3">
                        <!-- <label for="exampleInputName1" class="form-label">First Name:</label> -->
                        <input type="text" class="form-control" v-model="firstName" placeholder="First Name..." id="exampleInputName1">
                    </div>
                    <div class="mb-3">
                        <!-- <label for="exampleInputSurname1" class="form-label">Surname</label> -->
                        <input type="text" class="form-control" v-model="lastName" placeholder="Surname..." id="exampleInputSurname1">
                    </div>
                </div>
                <div id="name">
                    <div class="mb-3">
                        <!-- <label for="exampleInputAge1" class="form-label">Age</label> -->
                        <input type="text" class="form-control" v-model="age" placeholder="Age" id="exampleInputAge1">
                    </div>
                    <div class="mb-3">
                        <!-- <label for="exampleInputUsername1" class="form-label">Username</label> -->
                        <input type="text" class="form-control" v-model="username" placeholder="Username" id="exampleInputUsername1">
                    </div>
                </div>
                <div id="name" >
                    <div class="mb-3">
                        <!-- <label for="exampleInputEmail1" class="form-label">Email address</label> -->
                        <input type="email" class="form-control" v-model="email" placeholder="email@gmail.com" id="exampleInputEmail1">
                    </div>
                    <div class="mb-3">
                        <!-- <label for="exampleInputPassword1" class="form-label">Password</label> -->
                        <input type="password" class="form-control" v-model="password" placeholder="Enter Password" id="exampleInputPassword1">
                    </div>
                </div>
                <div id="name" >
                    <div class="mb-3">
                        <!-- <label for="exampleInputRole1" class="form-label">Role</label> -->
                        <input type="role" class="form-control" v-model="role" placeholder="role" id="exampleInputRole1">
                    </div>
                    <div class="mb-3">
                        <!-- <label for="exampleInputProfile1" class="form-label">Profile Url</label> -->
                        <input type="profile" class="form-control" v-model="profile" placeholder="profile url" id="exampleInputProfile1">
                    </div>
                </div>
                <div id="name" >
                    <div class="mb-3">
                        <!-- <label for="exampleInputBackground1" class="form-label">Background Url</label> -->
                        <input type="background" class="form-control" v-model="background" placeholder="Background url" id="exampleInputBackground1">
                    </div>
                    <div class="mb-3">
                        <!-- <label for="exampleInputGender1" class="form-label">Gender</label> -->
                        <input type="gender" class="form-control" v-model="gender" placeholder="Gender" id="exampleInputPassword1">
                    </div>
                </div>
                <button @click.prevent="addUser()" class="btn btn-custom">Register</button>
            </form>
        </div>
        <div class="col-12 col-sm-6">
            <h2>Good {{ timeOfDay }}</h2>
            <h4>Welcome to <span>COMFORT CORNER</span></h4>
            <p>Already have an account?</p>
            <button class="btn btn-dark" @click="navigateToLogin" id="custom">LogIn</button>
            <div>
               <img src="https://yolandamatiwane.github.io/socialMediaImg/empathy-care-and-online-help-of-friend-vector-47982566-fotor-bg-remover-20240826215859.png">
            </div>
 
        </div>
        </div>
    </div>

    
</template>
<script>

export default {
    data(){
        return{
            firstName: '',
            lastName: '',
            age: '',
            username:'',
            email:'',
            password:'',
            role:'',
            profile:'',
            background:'',
            gender:'',
            currentTime: new Date()
        }
    },methods:{
        addUser(){
            this.$store.dispatch('registerUser',this.$data)
        },
        navigateToLogin() {
            this.$router.push('/login');
        }
    },
    computed:{
        timeOfDay(){
        let hour = this.currentTime.getHours()
        if(hour>= 5 && hour<12){
            return 'Morning'
        } else if(hour>=12 && hour < 18){
            return 'Afternoon'
        }else{
            return 'Evening'
        }
        }
    }
}
</script>
<style scoped>
.container {
    background-image: url('https://yolandamatiwane.github.io/socialMediaImg/ProjectLogIn.jpg');
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat; 
    min-height:80vh;
    padding: 20px; 
    margin:50px 100px ;
    font-weight: 600;
    color: #36454F;
    border-radius: 10px;
}
form .form-control{
    border: 3px solid #a4d4a1;
    color: #36454F;
    font-weight: 400;
}
.btn-custom{
    background-color: #a4d4a1;
    color: #36454F;
    font-weight: 400;
}
.btn-custom:hover{
    background-color: white;
    border:2px solid #a4d4a1;
    color: #a4d4a1;
    font-weight: 400;
}
#custom{
    background-color: #36454F;
    color: white;
}
#custom:hover{
    background-color:white;
    border:3px solid #36454F;
    color:#36454F;
}
.mb-3{
    width: 200px;
    margin-left: 30px;
}
#name{
    display: flex;
    justify-content: center;
}
.btn-custom{
    background-color: #a4d4a1;
    color: #36454F;
    font-weight: 400;
}
.btn-custom:hover{
    border:3px solid #a4d4a1;
    color: #a4d4a1;
    font-weight: 400;
}
form{
    margin: 55px;
}
.col-12 img{
    margin-top: 30px;
    width: 50%;

}
span,h5{
    font-weight: 800;
}
/* Media Queries */
@media(max-width:1100px){
    .container{
        margin: 0px;
        min-height: 100vh;
        min-width: 100vw;
    }
    form{
        width: 80%;
        margin: auto 0px !important;
    }
}
@media(max-width:750px){
    #name{
        display:flex;
        flex-direction:column;
    }
    form{
        margin: auto 0px;
    }
}
@media(max-width:578px){
    .container{
        display:flex;
        flex-direction:column-reverse !important;
    }
}
@media (max-width: 350px) {
  .container {
    padding: 5px;
    margin:0px;
  }
  .col-12 img {
    width: 100%;
  }

  .btn-custom, #custom {
    font-size: 14px;
  }
  form{
    width:100% !important;
    margin: 0px !important;

  }
}
</style>