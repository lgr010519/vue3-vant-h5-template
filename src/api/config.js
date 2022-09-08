import axios from 'axios'
import router from '../router'

export const baseUrl = import.meta.env.VITE_API_BASE_URL

axios.defaults.timeout = 30000

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = 'Bearer ' + token)

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      let token
      if (res.headers && res.headers.authorization) {
        token = res.headers.authorization
        localStorage.setItem('token', token)
      }
      if (
        res.data.code === 10127 ||
        res.data.code === 10126 ||
        res.data.code === 10117
      ) {
        // token失效
        localStorage.removeItem('token')
        router.replace('/login')
      }
    }
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

function fetchData(method, url, data = {}) {
  return new Promise((resolve, reject) => {
    let request
    if (method === 'get' || method === 'delete') {
      request = axios[method](baseUrl + url, { params: data })
    } else {
      request = axios[method](baseUrl + url, data)
    }
    request
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        if (!axios.isCancel(e) || e.message !== 'canceled') {
          reject(e)
        }
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
