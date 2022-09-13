import { baseUrl, post, get, upload } from './config'

export const uploadUrl = baseUrl + '/common/uploads'

/**
 * 文件上传
 * @param {*} data
 */
export const uploadFile = (data) => upload('/common/uploads', data)

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

//获取街道
export const getStreet = () => {
  return get('/api/v1/district')
}

/**
 * 获取诉求类型
 */
export const getAppealType = () => {
  return get('/down_list/workOrder/appealType')
}

//获取个人信息
export const getUserInformation = () => {
  return get('/api/v1/me')
}

// 新增在线诉求反映工单管理
export const addNewAppeal = (data) => {
  return post('/api/v1/appeal', data)
}

// 新增局长信箱诉求
export const addNewPetition = (data) => {
  return post('/api/v1/petition', data)
}

/**
 *
 * 新增人民建议征集
 * @param {*} data
 */
export const addNewPropose = (data) => {
  return post('/api/v1/propose', data)
}

/**
 * 获取服务范围说明详情
 * @param {*} data
 */
export const getRangeDetail = (data) => get(`/api/v1/description/query`, data)

/**
 * 获取站点列表
 * @param {*} data
 */
export const getStationList = (data) => get(`/api/v1/station/getAll`, data)

/**
 * 查询人民建议诉求详情
 * @param {*} orderId
 */
export const getProposeDetail = (orderId) => {
  return get(`/api/v1/propose/${orderId}/detail`)
}

/**
 * 查询局长信箱诉求详情
 * @param {*} orderId
 */
export const getPetitionDetail = (orderId) => {
  return get(`/api/v1/petition/${orderId}/detail`)
}
