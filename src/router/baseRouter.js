const MainLayout = () => import('/src/layouts/MainLayout.vue')
export default [
    {
        path: '/',
        component: MainLayout,
        redirect: {
          name: 'home'
        },
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('/src/views/home.vue')
            }
        ]
    },
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