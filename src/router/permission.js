const MainLayout = () => import('/src/layouts/MainLayout.vue')
const PageView  = () => import('/src/layouts/PageView.vue')
export default [
    {
        path: '/',
        redirect: {name: 'home'},
        component: MainLayout,
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                    permission: ['admin'],
                    icon: 'svgIcon-iconyejiguanli'
                },
                component: () => import('/src/views/home.vue')
            },
            {
                path: '/home2',
                name: 'home2',
                meta: {
                    title: '首页2',
                    permission: ['admin'],
                    icon: 'MenuOutlined'
                },
                component: () => import('/src/views/home.vue')
            },
            {
                path: '/form',
                name: 'form',
                meta: {
                    title: '表单',
                },
                component: PageView,
                children: [
                    {
                        path: '/form/input',
                        name: 'form-input',
                        meta: {
                            title: '输入框'
                        },
                        component: () => import('/src/views/from/input.vue')
                    },
                    {
                        path: '/form/select',
                        name: 'form-select',
                        meta: {
                            title: '下拉框'
                        },
                        component: () => import('/src/views/from/select.vue')
                    }
                ]
            },
            {
                path: 'https://pro.antdv.com/docs/router-and-nav',
                name: 'docs',
                meta: {
                    title: '跳转外部链接',
                    target: '_blank'
                },
            }
        ]
    },
    { 
        path: '/:w+',
        redirect: '/404'
    }
]
