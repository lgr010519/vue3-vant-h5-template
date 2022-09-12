//正则表单校验
const validator = (val) => {
  return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{10,}$/.test(val)
}
// 密码校验
export const passwordCheck = [
  { required: true, message: '请输入密码' },
  {
    validator,
    message: '密码必须大于或等于10位,至少需要包含数字、字母、字符三种类型',
    trigger: 'onBlur'
  }
]

// 手机号校验
export const telPhoneCheck = [
  { required: true, message: '请输入您的手机号' },
  { pattern: /^1\d{10}$/, message: '手机号格式错误', trigger: 'onBlur' }
]

// 身份证校验
export const idCard = [{ required: true, message: '请输入您的身份证号' }]

// 姓名校验
export const nameCheck = [{ required: true, message: '请填写您的真实姓名' }]

//验证码校验
export const smsCard = [{ required: true, message: '请输入验证码' }]

//诉求校验
export const talkSomething = [{ required: true, message: '请输入诉求详情' }]
