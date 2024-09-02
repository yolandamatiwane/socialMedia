import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/loginView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  }
  // ,
  // {
  //   path: '/logout',
  //   name: 'logout',
  //   component: () => import('../views/loginView.vue'),
  //   beforeEnter(){
  //     cookies.remove('token')
  //     if(!cookies.get('token')){
  //       router.push({name: 'login'})
  //       // setTimeout( ()=>{
  //       //   location.reload()
  //       // }, 2000)
        
  //     }
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
