/* eslint-disable */
import { createStore } from 'vuex'
import axios from 'axios'
import {useCookies} from 'vue-cookies'
import {toast} from 'vue3-toastify'
import router from '@/router'
import "vue3-toastify/dist/index.css"
const apiUrl = 'https://socialmedia-3kos.onrender.com/'

axios.defaults.withCredentials = true
axios.defaults.headers = $cookies.get('token')
export default createStore({
  state: {
    users:null,
    posts:null,
    user:null,
    post:null,
    single:null,
    comments:null,
    comment:null
    
  },
  getters: {
  },
  mutations: {
    setUser(state,payload){
      state.user=payload
    },
    setUsers(state,payload){
      state.users=payload
    },
    setPosts(state,payload){
      state.posts=payload
    },
    setPost(state,payload){
      state.post=payload
    },
    setSingle(state,payload){
      state.single=payload
    },
    setComments(state,payload){
      state.comments=payload
    },
    setComment(state,payload){
      state.comment=payload
    }
  },
  actions: {
    async registerUser({commit},info){
      try{
        let data = await axios.post(`http://localhost:2107/users/register`,info)
        // console.log(data)
        toast.success(data.message)

      } catch(err){
        toast.error(err.response?.data?.err)
      }
    },
    async loginUser({commit},info){
      try{
        let {data} = await axios.post(`http://localhost:2107/users/login`,info)
        $cookies.set('token',data.token)
        let role = JSON.parse(window.atob(data.token.split(".")[1]))
        $cookies.set('role',role.role)
        console.log(data.token)
        localStorage.setItem('userId',data.user_id)
        await router.push('/home')
        location.reload() 
        toast.success(data.message)

      }catch(err){
        toast.error(err.response?.data?.err)
      }
    },
    // fetching user using login 
    async fetchUser({commit}){
      try{
        let {data} = await axios.get('http://localhost:2107/users/user')
        // console.log(data)
        commit('setUser',data)
        if(data.err){
          toast.error(data.err)
          router.push('/login')
        }
      }catch(err){
        console.log(err)
        toast.error(err.response?.data?.err)
      }
    },
    // fetching user by id 
    async fetchUserById({commit},id){
      try{
      console.log(id)
        let {data} = await axios.get(`http://localhost:2107/users/user/${id}`)
        console.log(data)
        commit('setUser',data)
        if(data.err){
          toast.error(data.err)
          router.push('/login')
        }
      }catch(err){
        console.log(err.response?.data?.err)
      }

    },
    async fetchUsers({commit}){
      try{
        let {data} = await axios.get('http://localhost:2107/users/')
        console.log(data)
        commit('setUsers',data)
        if(data.err){
          toast.error(data.err)
          router.push('/login')
        }
      }catch(err){
        console.log(err.response?.data?.err)
      }

    },
    async updateProfile({commit,state},info){
      try {
        let [userId] = state.user
        console.log(userId.user_id)
        let {data} = await axios.patch(`http://localhost:2107/users/user/${userId.user_id}`,info)
        // console.log(data);
        toast.success(data.message)  
      } catch (err) {
        toast.error(err.response?.data?.err)
      }
    },
    async removeUser({commit,state}){
      try {
        const [userId] = state.user
        // console.log(userId.user_id);
        let data = await axios.delete(`http://localhost:2107/users/user/${userId.user_id}`)
        console.log(data)
        toast.success(data.message)
      } catch (err) {
        toast.error(err.response?.data?.err)
      }
    },
    // posts
    async fetchPosts({commit}){
      try {
        let {data} = await axios.get('http://localhost:2107/posts')
        commit('setPosts',data)
        if(data.err){
          toast.error(data.err)
          router.push('/login')
        }
      } catch (err) {
        toast.error(err.response?.data?.err)
      }
      
    },
    // fetches logged in user's posts
    async fetchPost({commit}){
      try {
        let {data} = await axios.get('http://localhost:2107/posts/post')
        console.log(data)
        commit('setPost',data)
        if(data.err){
          toast.error(data.err)
          router.push('/login')
        }
      } catch (err) {
        toast.error(err.response?.data?.err)
      }
    },
    // fetches single post
    async fetchPostById({commit},id){
      try {
        // console.log(id)
        let {data} = await axios.get(`http://localhost:2107/posts/${id}`)
        console.log(data)
        commit('setSingle',data)
        if(data.err){
          toast.error(data.err)
          router.push('/login')
        }
      } catch (err) {
        toast.error(err.response?.data?.err)
      }
    },

    // Posts
    async updatePost({commit},id){
      try {
        // console.log(id.post_id)
        let {data} = await axios.patch(`http://localhost:2107/posts/post/${id.post_id}`,id)
        // console.log(data)
        toast.success(data.message)
      } catch (err) {
        toast.error(err.response?.data?.err)
      }
    },
    async updatePostLog({commit},id){
      try {
        // console.log(id)
        let {data} = await axios.patch(`http://localhost:2107/posts/update/log/${id.post_id}`,id)
        // console.log(data)
        toast.success(data.message)
      } catch (err) {
        toast.error(err.response?.data?.err)
      }
    },
    async deletePost({commit},id){
      try {
        let {data} = await axios.delete(`http://localhost:2107/posts/post/${id}`)
        toast.success(data.message)
      } catch (err) {
        toast.error(err.response?.data?.err)
      }
    },
    async deletePostLog({commit},id){
      try {
        let {data} = await axios.delete(`http://localhost:2107/posts/delete/log/${id}`)
        toast.success(data.message)
      } catch (err) {
        toast.error(err.response?.data?.err)
      }
    },
    async addPost({commit},info){
      try {
        // console.log(info);
        let data = await axios.post(`http://localhost:2107/posts`,info)
        toast.success(data.message)
        // console.log(data)
      } catch (err) {
        toast.error(err.response?.data.err)
      }
    },
    // Comments
    async fetchComments({commit},id){
      try{
        console.log(id)
        let {data} = await axios.get(`http://localhost:2107/post/${id}/comments`)
        console.log(data)
        commit('setComments',data)
        if(data.err){
          toast.error(data.err,{
          autoClose:1000,
          position:'bottom-right',
        })
          router.push('/login')
        }

      } catch(err){
        console.log(err)
        toast.error(err.response?.data?.err,{
          autoClose:1000,
          position:'bottom-right'});
      }
    },
    async addComment({commit},info){
      try {
        console.log(info);
        let {data} = await axios.post(`http://localhost:2107/post/comment`,info)
        console.log(data)
        if (data.err) {
          toast.error("An error occurred: " + data.err);
        } else {
          toast.success(data.message);
        }
      } catch (err) {
        console.error('Error adding comment:', err);
        toast.error(err.response?.data?.err);
      }
    },
    async updateComment({commit},id){
      try {
              // console.log(id)
      // console.log(id.commment_id)
      let {data} = await axios.patch(`http://localhost:2107/post/${id.post_id}/comments/${id.comment_id}`,id)
      // console.log(data)
      toast.success(data.message)
      } catch (error) {
        toast.error(err.response?.data?.err)
      }
    },
    async deleteComment({commit},id){
      try {
              // console.log(id)
      let {data} = await axios.delete(`http://localhost:2107/post/delete/${id.comment_id}`)
      toast.success(data.message)
      } catch (err) {
        toast.error(err.response?.data?.err)
      }
    },
  },
  modules: {
  }
})
