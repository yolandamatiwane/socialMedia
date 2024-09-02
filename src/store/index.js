/* eslint-disable */
import { createStore } from 'vuex'
import axios from 'axios'
import {useCookies} from 'vue-cookies'
import router from '@/router'

axios.defaults.withCredentials = true
axios.defaults.headers = $cookies.get('token')
export default createStore({
  state: {
    users:null,
    posts:null,
    user:null,
    post:null
    
  },
  getters: {
  },
  mutations: {
    setUser(state,payload){
      state.user=payload
    },
    setPosts(state,payload){
      state.posts=payload
    },
    setPost(state,payload){
      state.post=payload
    }
  },
  actions: {
    async registerUser({commit},info){
      let data = await axios.post('http://localhost:2107/users/register',info)
      console.log(data)
    },
    async loginUser({commit},info){
      let {data} = await axios.post('http://localhost:2107/users/login',info)
      $cookies.set('token',data.token)

      console.log(data.token)
      await router.push('/')
      location.reload()

    },
    async fetchUser({commit}){
      try{
        let {data} = await axios.get('http://localhost:2107/users/user')
        console.log(data)
        commit('setUser',data)

      }catch(err){
        console.log(err)
      }

    },
    async fetchPosts({commit}){
      let {data} = await axios.get('http://localhost:2107/posts')
      commit('setPosts',data)
    },
    async fetchPost({commit}){
      let {data} = await axios.get('http://localhost:2107/posts/post')
      commit('setPost',data)
    }

  },
  modules: {
  }
})
