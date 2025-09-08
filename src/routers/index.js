import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/authentication/Login.vue'
import Signup from '@/views/authentication/Signup.vue'
import DashboardPage from '@/views/landing/DashboardPage.vue'
import OAuth2Redirect from "@/views/authentication/OAuth2Redirect.vue";

const routes = [
     { path: '/', redirect: { name: 'Login' } },
    {
        path: '/dashboard',
        name: 'Dashboard',  // Changed from 'Home' to be more specific
        component: DashboardPage,
        meta: { requiresAuth: true }  // Added auth requirement
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guestOnly: true }
    },
    {
        path: '/oauth2/redirect',
        name: 'OAuth2Redirect',
        component: OAuth2Redirect,
        meta: { guestOnly: true }
    },

    {
        path: '/register',
        name: 'Register',
        component: Signup,
        meta: { guestOnly: true }
    },
    {
        path: '/',  // Add root redirect
        redirect: '/dashboard'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 }
    }
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authToken')

    // Redirect unauthenticated users from protected routes
    if (to.meta.requiresAuth && !isAuthenticated) {
        return next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    }

    if (to.meta.guestOnly && isAuthenticated) {
        return next({ path: '/dashboard' })
    }

    next()
})

export default router