import asyncRouterMap from '@/router/permission'
import baseRouter from '@/router/baseRouter'
/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
 function hasPermission (permission, route) {
    if (route.meta && route.meta.permission) {
      let flag = false
      for (let i = 0, len = permission.length; i < len; i++) {
        flag = route.meta.permission.includes(permission[i])
        if (flag) {
          return true
        }
      }
      return false
    }
    return true
}

function filterAsyncRouter (routerMap, roles) {
    const accessedRouters = routerMap.filter(route => {
        if(hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}
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
        GenerateRoutes({commit}, roles) {
            console.log('permission 加载路由')
            return new Promise((resolve) => {
                const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}