<template>
    <div>
        <form>
            <div class="mb-3">
                <label for="exampleInputName1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputName1" class="form-label">First Name:</label>
                <input type="text" class="form-control" v-model="firstName">
            </div>
            <div class="mb-3">
                <label for="exampleInputSurname1" class="form-label">Surname</label>
                <input type="text" class="form-control" v-model="lastName">
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>

    
</template>
<script>

export default {
    data(){
        return{
            firstName: '',
            lastName: '',
            username:'',
            email:'',
            password:''
        }
    },methods:{
        addUser(){
            this.$store.dispatch('addUser',this.$data)
        }
    }
}
</script>
<style>
    /* .signup{
      color  : pink;
    } */
    
</style>