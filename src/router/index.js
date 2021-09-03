import { createRouter, createWebHistory} from 'vue-router'
// createWebHashHistory  Hash 模式
// createWebHistory HTML5 模式
import routes from './baseRouter'
import store from '@/store/index.js'
import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less' 
import { ACCESS_TOKEN } from '@/store/mutation-types.js'
import storage from 'store'
NProgress.configure({ showSpinner: false }) 

const allowRouteNameList = ['login'] 
const loginRouteName = 'login'
const defaulRoutePath = '/home'

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach(async (to, from, next) => {
    console.log(to)
   // 加载进度条开始
   NProgress.start()
   const token = storage.get(ACCESS_TOKEN)
   if(token) {
       if(to.name === 'login') {
            next({
                path: defaulRoutePath
            })
            NProgress.done()     
       } else {
           let roles = store.state.user.roles
           if(roles && roles.length === 0) {
              let { roles }  = await store.dispatch('user/getUserinfo')
              await store.dispatch('permission/GenerateRoutes', roles)
              let addRouters = store.state.permission.addRouters
              addRouters.forEach(addRoute => {
                router.addRoute(addRoute)
              }) 
              next({ ...to, replace: true })
           } else {
              next()
           }
       }
   } else {
     if(allowRouteNameList.includes(to.name)) {
        next()
     } else {
         next({
            name: 'login',
            query: {
                redirect: to.fullPath
            }
         })
     }
   }
})

router.afterEach(() => {
   // 加载进度条结束
   NProgress.done() 
})  
export default router