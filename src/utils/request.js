import axios from 'axios'
import { notification } from 'ant-design-vue';
// 响应返回成功码
const resSucCode = [200]
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// 异常拦截处理器
const errorHandler = (error, data) => {
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    notification.error({
      message: '错误提示',
      description: '请求超时'
    })
    return Promise.reject(error)
  }
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    // const token = storage.get(ACCESS_TOKEN)
    const message = data.msg
    const refreshToken = storage.get(REFRESH_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.msg
      })
    } else if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      if (token) {
        notification.error({
            message: 'Forbidden',
            description: '需要重新登陆'
        })
      }
    }
    notification.error({
        message: '错误提示',
        description: message
    })
  }
  return Promise.reject(error)
}
// 登录超时后，根据刷新token，获取一个新的token。
async function refreshJWTToken (error) {
  const data = await store.dispatch('RefreshToken')
  const accessToken = data.accessToken
  const token = accessToken
  const config = error.response.config
  config.headers.Authorization = token
  const res = await axios.request(config)
  return res.data
}
// request interceptor
request.interceptors.request.use(config => {
    let token = ''
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {

  const result = response.jwtTokenVO
  if (result) {
    store.dispatch('RebuildToken', result)
  }
  if (response && !resSucCode.includes(response.data.code)) {
    notification.error({
      message: '错误提示',
      description: response.data.msg
    })
    return Promise.reject(new Error(JSON.stringify(response.data)))
  }
  return response.data
}, errorHandler)

export default request
