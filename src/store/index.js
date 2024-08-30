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
    posts:null
    
  },
  getters: {
  },
  mutations: {
    setUsers(state,payload){
      state.users=payload
    },
    setPosts(state,payload){
      state.posts=payload
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
    },
    async fetchUsers({commit}){
      let {data} = await axios.get('http://localhost:2107/users')
      commit('setUsers',data)
      console.log(data)
    }

  },
  modules: {
  }
})
