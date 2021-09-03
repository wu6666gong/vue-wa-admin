export default [
    { 
        path: '/login', 
        name: 'login',
        component: () => import('/src/views/login.vue')
    },
    {
        path: '/404',
        component: () => import( '/src/views/404.vue')
    },
]