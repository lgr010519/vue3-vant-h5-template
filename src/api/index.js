import { baseUrl, post, get, upload } from './config'

export const uploadUrl = baseUrl + '/common/uploads'

/**
 * 文件上传
 * @param {*} data
 */
export const uploadFile = (data) => upload('/common/uploads', data)

//用户注册
export const userRegister = (data) => post('/api/v1/auth/register', data)

//发送验证码接口
export const mobileCode = (data) => post('/api/v1/send/code', data)

//登录接口
export const passwordLogin = (data) => post('/api/v1/auth/login', data)

//忘记密码
export const updatePassword = (data) => post('/api/v1/auth/forget', data)

//获取街道
export const getStreet = () => get('/api/v1/district')

/**
 * 获取诉求类型
 */
export const getAppealType = () => get('/down_list/workOrder/appealType')

//获取个人信息
export const getUserInformation = () => get('/api/v1/me')

/**
 *@param {*} data
 *新增诉求
 */
export const createAppeal = (data) => post('/api/v1/order/create', data)

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
 * 获取在线诉求详情
 * @param {*} id
 * @param {*} data
 */
export const getAppealDetail = (orderId) => get(`/api/v1/order/detail/${orderId}`)

/**
 * 查询我的事项
 */
export const getMyOrderList = (mySelf) => get('/api/v1/order/list', mySelf)
