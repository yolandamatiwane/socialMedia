import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import AOS from 'aos'
import VueCookies from 'vue-cookies'
import 'aos/dist/aos.css'; 

createApp(App).use(store).use(router).use(VueCookies,{expires:'1h'}).mount('#app')
AOS.init()
