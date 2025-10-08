import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/auth/Login.vue'
import Register from './views/auth/Register.vue'
import Home from './views/Home.vue'
import AccountActive from './views/auth/Account-Active.vue'
import { useCookies } from 'vue3-cookies'

const routes = [
    { path: '/register', component: Register, meta: { sidebar: false } },
    { path: '/login', component: Login, meta: { sidebar: false } },
    { path: '/', component: Home, meta: { sidebar: true, requiresAuth: false } },
    { path: '/account-active', component: AccountActive, meta: { sidebar: false } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const { cookies } = useCookies()
    const token = cookies.get('access_token')

    if (to.meta.requiresAuth && !token) {
        next('/login')
    } else if ((to.path === '/login' || to.path === '/register') && token) {
        next('/')
    } else {
        next()
    }
})

export default router
