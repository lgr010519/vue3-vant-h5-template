import { baseUrl , post} from './config'

export const uploadUrl = baseUrl + '/uploads'

export const passwordLogin = (data)=>{ post('/api/v1/auth/login',data) }