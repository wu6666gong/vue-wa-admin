/**
 * 向后端请求用户的菜单，动态生成路由
 */
import baseRouter from '@/router/baseRouter'
import { generatorDynamicRouter } from '@/router/generator-routers'
export default {
    namespaced: true,
    state: () => ({
        routers: baseRouter,
        addRouters: []
    }),
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = baseRouter.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({commit}, menuList) {
            console.log('async router 加载路由')
            return new Promise((resolve) => {
                generatorDynamicRouter(menuList).then(({routers}) => {
                    console.log(routers, 'generatorDynamicRoutergeneratorDynamicRoutergeneratorDynamicRouter')
                    commit('SET_ROUTERS', routers)
                    resolve()
                })
            })
        }
    }
}