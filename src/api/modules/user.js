
import request from '@/utils/request'

// 登陆接口
export function login(data){
    return request({
        url: '/login',
        data,
        method: 'POST'
    })
} 
// 退出
export function logout(data){
    return request({
        url: '/logout',
        data,
        method: 'POST'
    })
} 
// 获取用户信息
export function userinfo(data){
    return request({
        url: '/userinfo',
        data,
        method: 'POST'
    })
} 