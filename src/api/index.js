import { baseUrl , post} from './config'

export const uploadUrl = baseUrl + '/uploads'

//密码登录验证接口
export const passwordLogin = (data)=>{ post('/api/v1/auth/login',data) }