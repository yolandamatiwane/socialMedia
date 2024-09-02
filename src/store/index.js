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
    user:null
    
  },
  getters: {
  },
  mutations: {
    setUsers(state,payload){
      state.users=payload
    },
    setPosts(state,payload){
      state.posts=payload
    },
    setUser(state,payload){
      state.user=payload
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
    async fetchUsers({commit}){
      let {data} = await axios.get('http://localhost:2107/users')
      // console.log(data)
      commit('setUsers',data)
    },
    async fetchUser({commit}){
      let {data} = await axios.get('http://localhost:2107/users/user')
      commit('setUser',data)
      console.log(data)
    },
    async fetchPosts({commit}){
      let {data} = await axios.get('http://localhost:2107/posts')
      commit('setPosts',data)
    }

  },
  modules: {
  }
})
