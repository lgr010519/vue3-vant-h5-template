import { baseUrl, post } from './config'

export const uploadUrl = baseUrl + '/uploads'

//用户注册
export const userRegister = (data) => {
  return post('/api/v1/auth/register', data)
}

//发送验证码接口
export const mobileCode = (data) => {
  return post('/api/v1/send/code', data)
}

//登录接口
export const passwordLogin = (data) => {
  return post('/api/v1/auth/login', data)
}

//忘记密码
export const updatePassword = (data) => {
  return post('/api/v1/auth/forget', data)
}
