<template>
    <div>
        <h4>Already have an account? Login</h4>
        <label>Username:</label><input type="text" v-model="email" placeholder="Enter your email"><br><br>
        <label>Password:</label><input type="password" v-model="password" placeholder="Enter your password"><br><br>
        <button @click="login()">Submit</button>
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