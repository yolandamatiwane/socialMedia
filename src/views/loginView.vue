<template>
    <div class="container text-center">
        <div class="row">
            <div class="col-12 col-sm-6">
                <h4>Don't have an account?</h4>
                <button class="btn btn-dark" @click="navigateToRegister">SignUp</button>
            </div>
            <div class="col-12 col-sm-6">
                <form >
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" v-model="email" id="exampleInputEmail1">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" v-model="password" id="exampleInputPassword1">
                    </div>
                    <button @click.prevent="login()" class="btn btn-primary">Submit</button>
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
            password:''
        }
    }, methods:{
        login(){
            this.$store.dispatch('loginUser', {email:this.email, password:this.password})
        },
        navigateToRegister() {
            this.$router.push('/register');
        }
    }
    
    
}
</script>
<style>
    
</style>