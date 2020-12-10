/* 对axios根据业务需求再次封装 */
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const codeWhiteList = [
    2001,
    2003,
    3001,
    4011,
    4007,
    5004,
    4012,
    4013,
    4014,
    4015,
    4016,
    4017,
] // 不需要弹窗的code错误码白名单
// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        if (config.method === 'get') {
            config.url +=
                config.url.indexOf('?') === -1
                    ? `?timeNow=${new Date().getTime()}`
                    : `&timeNow=${new Date().getTime()}`
        }

        // 将设备信息放到请求头里面
        const terminal = store.getters.terminal
        config.headers.terminal = terminal
        return config
    },
    error => {
        // console.log('request-error:', error)

        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 拦截文件流
        const headers = response.headers
        if (headers['content-type'] === 'application/octet-stream') {
            return response.data
        }

        const res = response.data
        if (res.code === 200) {
            // 响应成功
            return res.data
        } else {
            if (codeWhiteList.includes(res.code)) {
                // 不需要弹窗的情况
                // 微信没有绑定手机号的情况下
                return Promise.reject(res)
            } else {
                /* 其他的情况 */
                Toast({
                    message: res.msg || 'response error',
                    duration: 5 * 1000,
                })
                return Promise.reject(res)
            }
        }
    },
    error => {
        // if (error.response.status > 500 && error.response.status < 506) {
        //   Toast('服务器错误')
        // } else {
        //   Toast(error.msg)
        // }
        if (process.env.NODE_ENV === 'development') {
            Toast(error.msg)
        } else {
            Toast('服务器错误')
        }
        return Promise.reject(error)
    }
)

export default service
