<template>
  <div class="mainHome">
    <LoadingOverlay :isLoading = "isLoading"/>

    <div class="container-fluid text-center">
      <div class="row">
        <div class="col-12 col-sm-7 order-2 order-sm-1" id="main">
          <div class="flex">
            <div id="homeUserDets" v-for="user in users" :key="user.user_id">
            <img :src="user.profile" id="userPic">
            <div>{{ user.firstName }}</div>
            </div>
          </div>
          <div>
            <div class="card" v-for="post in posts" :key="post.post_id">
              <div class="card-header">
                <div>
                  <img :src="post.profile" id="userImage">
                  {{ post.firstName }} {{ post.lastName }}
                </div>
                <div>
                  <i class="bi bi-three-dots"></i>
                </div>
              </div>
              <div class="card-body">
                <h5>{{ post.content }}</h5>
                <div v-if="post.url && post.url!==' '">
                  <img :src="post.url" class="fit-bottom" id="bodyImg">
                </div>
              </div>
              <div class="card-footer">
                <div>
                  <i class="bi bi-heart-fill"></i> <label>Like</label>
                  <button @click="navigateToPost(post.post_id)" class="btn">
                    <i class="bi bi-chat-dots-fill"></i>
                    <label>comments</label>
                  </button>
                  <i class="bi bi-send-fill"></i>
                </div>
                <div>
                  <i class="bi bi-bookmark-fill"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-5 order-1 order-sm-2" id="Resources">
          <div class="input-group mb-3">
          <button class="btn btn-custom"><i class="bi bi-search"></i></button>
          <input type="text" class="form-control" placeholder="Search..." aria-label="search" aria-describedby="basic-addon1" v-model="searchTerm">
          </div>
          <div>
            <div v-for="user in limitedSearchResults" :key="user.user_id" class="search-result">
              <div>
                <img :src="user.profile" id="userSearch">
                {{ user.firstName }} {{ user.lastName }}
              </div>
              <div class="addPerson">
                <h3><i class="bi bi-person-add"></i></h3>
              </div>
            </div>
          </div>
          <div>
            <h4>Recommendations:</h4>
            <h6>Dealing with grief can be quite overwhelming, below we have some suggestions outside of this app that could possibly assist you further.</h6>
            <div class="card">
              <h6 id="h">Counseling Services:</h6>
              

            </div>
            <div class="card">
              <h6 id="h">Support Hotlines:</h6>


            </div>
            <div class="card">
              <h6 id="h">Books and Media:</h6>


            </div>
            <footer-comp/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import FooterComp from '@/components/FooterComp.vue';
import LoadingOverlay from '@/components/SpinnerComp.vue'
export default {
  name: 'HomeView',
  data(){
    return{
      searchTerm:'',
      maxSearchResults: 4,
      isLoading: true 
    }
  },
  computed:{
    users(){
      return this.$store.state.users || []
    },
    posts(){
      return this.$store.state.posts || []
    },
    filteredUsers() {
      const searchTermLower = this.searchTerm.toLowerCase();
      return this.users?.filter(user => 
        user.firstName.toLowerCase().includes(searchTermLower) ||
        user.lastName.toLowerCase().includes(searchTermLower)
      )
    },
    limitedSearchResults() {
      return this.filteredUsers.slice(0, this.maxSearchResults);
    }
  }
  ,
  methods:{
    async getPosts(){
      try{
        await this.$store.dispatch('fetchPosts')
      } finally{
        this.isLoading = false
      }
    },
    getUsers(){
      try{
        this.$store.dispatch('fetchUsers')
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.getPosts(),
    this.getUsers()
  },
  components:{
    FooterComp,
    LoadingOverlay
  }
}
</script>
<style scoped>
.mainHome{
  background-color: #36454F;
}
#userPic{
  width: 50%;
  border-radius: 50%;
  border: 5px solid #a4d4a1;
}
#userImage{
  width:40px;
  border-radius: 50%;
}
#homeUserDets{
  font-size:10px;
  color: white;
  border-bottom: 2px solid white;
  /* display: flex; */
}
.flex{
  display: flex;
}
.btn{
  color:white;
}
#bodyImg{
  width: 100%;
  height: 150px;

}
#userSearch{
  width: 50px;
}
.bi{
  width:fit-content;
}
.card{
  width: 80%;
  margin: 10px auto;
  border: none;
}
.card-header,.card-footer{
  background-color: #36454F;
  color: white;
  text-align:start;
  display: flex;
  justify-content: space-between;
  /* background-color: #a4d4a1; */
}
h4{
  color: #a4d4a1;
}
h6{
  color: white;
}
#h{
  color: #36454F;
}
.btn-custom{
  background-color: #a4d4a1;
}
#Resources{
  border-left: 3px solid white;
}
.search-result {
  display: flex;
  align-items: center;
  margin: 10px 0;
  justify-content: space-between;
  border-bottom: #a4d4a1;
}


.search-result img {
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.search-result div {
  color: white;
}
@media(max-width:900px){
  .mainHome{
    margin-left: 150px;
  }
}
@media(max-width:600px){
  .mainHome{
    margin-left: 0px;
  }
  .container-fluid{
    font-size: small;
  }
  footer{
    display: none;
  }
  #Resources{
    border-left:0px !important;
  }
}
</style>
