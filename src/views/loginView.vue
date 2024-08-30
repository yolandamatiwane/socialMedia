<template>
    <div>
        <h4>Already have an account? Login</h4>
        <!-- <label>Username:</label><input type="text" v-model="email" placeholder="Enter your email"><br><br>
        <label>Password:</label><input type="password" v-model="password" placeholder="Enter your password"><br><br>
        <button @click="login()">Submit</button> -->
        <form >
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" v-model="email">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" v-model="password">
            </div>
            <button @click="login()" class="btn btn-primary">Submit</button>
        </form>
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
        }
    }
    
}
</script>
<style>
    
</style>