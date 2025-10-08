import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import VueCookies from 'vue-cookies'

createApp(App).use(VueCookies).use(VueQueryPlugin).use(router).mount('#app');
