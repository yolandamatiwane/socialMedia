<template>
    <div class="container text-center">
        <div class="row">
            <div class="col-12 col-sm-6">
                <h1>Good {{ timeOfDay }}</h1>
                <h4>Welcome to <span>COMFORT CORNER</span></h4>


                <p>Don't have an account?</p>
                <button class="btn" @click="navigateToRegister" id="custom" >SignUp</button>
                <div>
                    <img src="https://yolandamatiwane.github.io/socialMediaImg/empathy-care-and-online-help-of-friend-vector-47982566-fotor-bg-remover-20240826215859.png">
                </div>
            </div>
            <div class="col-12 col-sm-6">
                <form>
                    <h5>Sign into your account:</h5>
                    <div class="mb-3">
                        <!-- <label for="exampleInputEmail1" class="form-label">Email address</label> -->
                        <input type="email" class="form-control" required v-model="email" placeholder="email@gmail.com" id="exampleInputEmail1">
                    </div>
                    <div class="mb-3">
                        <!-- <label for="exampleInputPassword1" class="form-label">Password</label> -->
                        <input type="password" class="form-control" required v-model="password" placeholder="enter password" id="exampleInputPassword1">
                    </div>
                    <button @click.prevent="login()" class="btn btn-custom">LogIn</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            email:'',
            password:'',
            currentTime: new Date()
        }
    }, methods:{
        login(){
            this.$store.dispatch('loginUser', {email:this.email, password:this.password})
        },
        navigateToRegister() {
            this.$router.push('/register');
        }
    }, computed:{
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
    /* align-items:center;
    justify-content:center; */
    background-image: url('https://yolandamatiwane.github.io/socialMediaImg/ProjectSignUp.jpg');
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat;
    padding: 20px;
    /* min-height:100vh; */
    margin: 125px 100px ;
    font-weight: 600;
    color: #36454F;
    border-radius: 10px;
}
.col-12 form{
    margin: 100px 150px;
}
form .form-control{
    border: 3px solid #a4d4a1;
    color: #36454F;
}
/* form .form-control:hover{
    border: 3px solid #a4d4a1;
    color: #36454F;
} */
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
#custom{
    background-color: #36454F;
    color: white;
}
#custom:hover{
    background-color:white;
    border:3px solid #36454F;
    color:#36454F;
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
        width: 60%;
        margin: 50px 100px !important;
    }
}
@media(max-width:750px){
    form{
        /* width: 100%; */
        /* margin: 25px 50px !important; */
        margin: auto;
        justify-content: center;
        align-self: center;
    }
}
@media(max-width:430px){
    form{
        margin: 0px !important;
        width:100%;
    }
}

@media(max-width: 350px){
    form{

        width: 100%;
    }
}

</style>