<template>
  <div>
    <div class="container-fluid text-center">
      <div class="row">
        <div class="col-8" id="main">
          <div class="flex">
            <div id="homeUserDets" v-for="user in users" :key="user.user_id">
            <img :src="user.profile" id="userPic">
            <div>{{ user.firstName }}</div>
          </div>
          </div>
          <div>
            <div class="card" v-for="post in posts" :key="post.post_id">
              <div class="card-body">
                <h5>{{ post.content }}</h5>
                <img :src="post.url" v-if="post.url!=null" class="fit-bottom">

              </div>

            </div>
          </div>
        </div>
        <div class="col">
          3 of 3
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  computed:{
    users(){
      return this.$store.state.users
    },
    posts(){
      return this.$store.state.posts
    }
  }
  ,
  methods:{
    getPosts(){
      this.$store.dispatch('fetchPosts')
    },
    getUsers(){
      this.$store.dispatch('fetchUsers')
    }
  },
  mounted() {
    this.getPosts(),
    this.getUsers()
  }
}
</script>
<style scoped>
#userPic{
  width: 20%;
  border-radius: 50%;
  border: 3px solid navy;
}
#homeUserDets{
  font-size:10px;
  /* display: flex; */
}
.flex{
  display: flex;
}
/* body{
  background-color: black;
} */


</style>
