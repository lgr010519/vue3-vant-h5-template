<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-overflow-auto">
    <div class="tw-w-[65px] tw-h-[60px] tw-mt-[70px] tw-mx-auto">
      <img
        src="../../assets/images/login/logo.png"
        class="width:100%;height:100%"
        alt="" />
    </div>
    <h1 class="title tw-h-[18px] tw-mt-[20px] tw-mx-auto tw-text-center">
      深圳生态环境群众诉求服务
    </h1>
    <van-form
      @submit="onSubmit"
      class="login_form tw-mt-[48px]">
      <van-field
        style="background-color: #f9f9f9"
        v-model="user.username"
        name="password"
        placeholder="请输入手机号"
        :rules="telPhoneCheck">
        <template #label>
          <div class="tw-h-[24px] tw-flex tw-items-center">
            <img
              class=""
              src="../../assets/images/login/icon_phone.png"
              alt=""
              width="20"
              height="20" />
          </div>
        </template>
      </van-field>
      <van-field
        style="background-color: #f9f9f9"
        v-model="user.smscode"
        placeholder="请输入验证码"
        :rules="smsCard">
        <template #label>
          <div class="tw-h-[33px] tw-flex tw-items-center">
            <img
              class=""
              src="../../assets/images/login/icon_password.png"
              alt=""
              width="20"
              height="20" />
          </div>
        </template>
        <template #button>
          <van-button
            ref="btn"
            size="small"
            type="default"
            @click="send"
            :disabled="isSend"
            style="border: none; color: #3189ff; font-size: 13px; background-color: #f9f9f9">
            {{ sendSmsBtnText }}
          </van-button>
        </template>
      </van-field>
      <p class="forget tw-w-[100%] tw-mt-[16px] tw-pr-[14px]">
        <span @click="forget">忘记密码</span>
      </p>
      <div class="tw-mx-[14px] tw-mt-[36px]">
        <van-button
          block
          type="primary"
          color="#3189FF"
          native-type="submit">
          登录
        </van-button>
      </div>

      <p class="tw-mx-auto tw-text-center tw-text-[16px] tw-text-[#666666] tw-mt-[12px]">
        <span @click="login">密码登录</span>
      </p>
      <p class="tw-text-center tw-text-[13px] tw-mt-[138px] tw-text-[#666666] tw-pb-[50px]">
        <span @click="register">用户注册</span>
      </p>
    </van-form>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Toast } from 'vant'
  import { mobileCode, passwordLogin } from '@/api/index'
  import { telPhoneCheck, smsCard } from '@/configs/globalvar'
  const router = useRouter()
  const user = reactive({
    username: '',
    smscode: ''
  })
  const isSend = ref(false)
  const login = () => {
    router.push('/login')
  }
  const register = () => {
    router.push('/register')
  }
  const onSubmit = async () => {
    const result = await passwordLogin({
      auth_type: 'sms',
      smscode: user.smscode,
      username: user.username
    })
    if (result.data.data) {
      localStorage.setItem('token', result.data.data.token)
      Toast('登录成功')
      router.push('/index')
    } else {
      Toast(result.data.msg)
    }
  }
  const forget = () => {
    router.push({ path: '/forget' })
  }
  const btn = ref()
  const sendSmsBtnText = ref('获取验证码')
  // 手机号正则校验
  const RegExpPhone = (val) => {
    console.log(val)
    return /^1\d{10}$/.test(val)
  }
  const send = async () => {
    //发送验证请求
    if (user.username && RegExpPhone(user.username)) {
      const result = await mobileCode({ mobile: user.username })
      if (result.data.code === 0) {
        isSend.value = true
        Toast('发送成功,请检查您的手机短信')
        let count = 30
        sendSmsBtnText.value = `已发送${count}s`
        const interval = setInterval(() => {
          if (count <= 0) {
            clearInterval(interval)
            sendSmsBtnText.value = '发送验证码'
            isSend.value = false
          } else {
            count--
            sendSmsBtnText.value = `已发送${count}s`
          }
        }, 1000)
      } else {
        Toast(result.data.msg)
      }
    } else {
      // 弹出提示
      Toast('验证码发送失败,请检查你的手机号')
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #0084bd;
    line-height: 18px;
  }
  .forget {
    font-size: 13px;
    font-weight: 400;
    color: #666666;
    line-height: 13px;
    text-align: right;
  }

  .login_form.van-form {
    @extend .custom_van_form;
    padding: 0px 14px;
    :deep(.van-cell.van-field) {
      .van-field__label {
        width: 20px;
        margin-right: 20px;
      }
    }
  }
</style>
