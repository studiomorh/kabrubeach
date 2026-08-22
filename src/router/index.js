import { createRouter, createWebHistory } from 'vue-router'

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

export default router