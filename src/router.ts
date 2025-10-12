import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/auth/Login.vue'
import Register from './views/auth/Register.vue'
import Home from './views/Home.vue'
import AccountActive from './views/auth/Account-Active.vue'
import { useCookies } from 'vue3-cookies'
import { authService } from './services/authService'

const routes = [
    { path: '/register', component: Register, meta: { sidebar: false } },
    { path: '/login', component: Login, meta: { sidebar: false } },
    { path: '/', component: Home, meta: { sidebar: true, requiresAuth: false } },
    { path: '/account-active', component: AccountActive, meta: { sidebar: false } }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    const { cookies } = useCookies()
    const accessToken = cookies.get('access_token')
    const token = to.query.token as string | undefined

    if (to.meta.requiresAuth && !accessToken) {
        return next('/login')
    }

    if ((to.path === '/login' || to.path === '/register') && accessToken) {
        return next('/')
    }

    if (to.path === '/account-active') {
        if (!token) return next('/login')

        try {
            const { response } = await authService.getAccountActive(token)

            if (response.status === 404) {
                return next('/login')
            }
        } catch (err) {
            return next('/login')
        }
    }

    return next()
})

export default router
