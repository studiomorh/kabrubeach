import { createRouter, createWebHistory } from 'vue-router'

import { loadSession } from '../api/session.js'
import Home from '../pages/Home/Home.vue'
import Login from '../pages/Login/Login.vue'
import Dashboard from '../pages/Dashboard/Dashboard.vue'
import Passeios from '../pages/Passeios/Passeios.vue'
import PdfEditor from '../pages/PdfEditor/PdfEditor.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: '/passeios',
        name: 'passeios',
        component: Passeios,
    },
    {
        path: '/editar-pdf',
        name: 'editar-pdf',
        component: PdfEditor,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

router.beforeEach(async (to) => {
    if (!to.meta.requiresAuth && to.name !== 'login') return true

    let user = null
    try {
        user = await loadSession()
    } catch {
        if (to.meta.requiresAuth) return { name: 'login' }
        return true
    }

    if (to.meta.requiresAuth && !user) return { name: 'login' }
    if (to.name === 'login' && user) return { name: 'dashboard' }
    return true
})

export default router