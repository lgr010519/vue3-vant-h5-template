import axios from 'axios'
import { showFailToast } from 'vant'

axios.defaults.timeout = 30000
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = 'Bearer ' + token)

    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

// 拦截返回结果
axios.interceptors.response.use(
  // 2xx 范围内的状态码都会触发该函数。
  (res) => {
    const { showMsg } = res.config
    if (res.status === 200) {
      let token
      if (res.headers && res.headers.authorization) {
        token = res.headers.authorization
        localStorage.setItem('token', token)
      }
      // 接口不正确
      if (res.data.code !== 0) {
        if (
          res.data.code === 10127 ||
          res.data.code === 10126 ||
          res.data.code === 10117 ||
          res.data.code === 10128
        ) {
          // token失效
          localStorage.removeItem('token')
          // 清空用户信息
          localStorage.removeItem('userInfo')
          // 跳转登录
        }
        showMsg && showFailToast(res.data.msg)
        return Promise.reject(res.data.msg)
      }
    } else {
      showMsg && showFailToast('请求服务器失败！')
      return Promise.reject('请求服务器失败！')
    }
    return res
  },
  // 超出 2xx 范围的状态码都会触发该函数。
  (err) => {
    const { message, response, config } = err
    let msg = message ? message : '请求服务器失败！'
    if (response) {
      const { data } = err.response
      if (data) {
        if (data.msg) {
          msg = data.msg
        }
        if (
          data.code === 10127 ||
          data.code === 10126 ||
          data.code === 10117 ||
          data.code === 10128
        ) {
          // token失效
          localStorage.removeItem('token')
          // 清空用户信息
          localStorage.removeItem('userInfo')
          // 跳转登录
        }
      }
    }
    config.showMsg && showFailToast(msg)
    err.message = msg
    return Promise.reject(err)
  },
)

/**
 * request封装
 */
export function fetchData(method, url, data = {}, config = { showMsg: true }) {
  return new Promise((resolve, reject) => {
    let request
    if (method === 'get' || method === 'delete') {
      request = axios[method](url, { params: data, ...config })
    } else {
      request = axios[method](url, data, { ...config })
    }
    request
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
export const get = function (url, params) {
  return fetchData('get', url, params)
}

export const post = function (url, data) {
  return fetchData('post', url, data)
}

export const put = function (url, data) {
  return fetchData('put', url, data)
}

export const remove = function (url, params) {
  return fetchData('delete', url, params)
}

export const upload = function (url, data) {
  const formData = new FormData()
  Object.keys(data).forEach((child) => {
    formData.append(child, data[child])
  })
  return post(url, formData)
}
