<template>
    <div class="container text-center">
        <div class="row">
        <div class="col-12 col-sm-6">
            <h3>SignUp Below</h3>
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
                <button @click.prevent="addUser()" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <div class="col-12 col-sm-6">
            <h2>Good {{ timeOfDay }}</h2>
            <h3>Already have an account?</h3>
            <button class="btn btn-dark" @click="navigateToLogin">LogIn</button>
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
<style>

</style>