import  { userAPI } from '@/api'
import storage from 'store'
import { ACCESS_TOKEN, USER_INFO } from '../mutation-types'
import { localExpirseTime } from '@/config/index'
export default {
    namespaced: true,
    state: () => ({
        userInfo: {},
        roles: []
    }),
    mutations: {
        SET_ROLES:(state, roles) => {
            state.roles = roles
        },
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo
        }
    },
    actions: {
        // 登陆
        logins({state,commit}, payload){
            return new Promise((reslove,reject) => {
                userAPI.login({...payload}).then((res) => {
                    storage.set(ACCESS_TOKEN, res.data.token, localExpirseTime)
                    reslove(res)
                })  
            })
        },
        // 退出
        logout({state,commit}, payload){
            return new Promise((reslove,reject) => {
                userAPI.login({...payload}).then((res) => {
                    commit('SET_ROLES', [])
                    commit('SET_USER_INFO', {})
                    storage.remove(ACCESS_TOKEN)
                    storage.remove(USER_INFO)
                    reslove(res)
                })  
            })
        },
        // 获取用户信息
        getUserinfo({state,commit}){
            return new Promise((reslove, reject) => {
                userAPI.userinfo().then((res) => {
                    commit('SET_ROLES', res.data.roles)
                    commit('SET_USER_INFO',res.data.userinfo)
                    storage.set(USER_INFO, res.data.userinfo, localExpirseTime)
                    reslove(res.data)
                })  
            })  
        }
    }
}