import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/auth/Login.vue'
import Register from './views/auth/Register.vue'
import Home from './views/Home.vue'

const routes = [
    { path: '/register', component: Register, meta: { sidebar: false } },
    { path: '/login', component: Login, meta: { sidebar: false } },
    { path: '/', component: Home, meta: { sidebar: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router