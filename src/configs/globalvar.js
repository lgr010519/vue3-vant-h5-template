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

// 诉求对象名称
export const userObjName = [{ required: true, message: '请输入诉求对象名称' }]

// 诉求对象地址
export const userObjAddress = [{ required: true, message: '请选择诉求对象地址' }]

//诉求对象详细地址
export const userObjMessageAddress = [{ required: true, message: '请填写诉求对象详细地址' }]

//诉求类型
export const userObjType = [{ required: true, message: '请选择诉求类型' }]

//诉求描述
export const userObjChinese = [{ required: true, message: '请填写述求描述' }]
