import { createStore } from 'vuex'
import user from './modules/user'
// 根据角色生成路由
// import permission from './modules/permission'
// 根据后台返回list生成路由
import permission from './modules/async-router'
const store  = createStore({
    modules: {
        user,
        permission
    }
})
export default store