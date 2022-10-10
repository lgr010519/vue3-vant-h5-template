<template>
  <div class="tw-h-[100%] tw-w-[100%] tw-overflow-auto">
    <div class="tw-mx-auto tw-mt-[70px] tw-h-[60px] tw-w-[65px]">
      <img
        src="../../assets/images/login/logo.png"
        class="width:100%;height:100%"
        alt="" />
    </div>
    <h1 class="title tw-mx-auto tw-mt-[20px] tw-h-[18px] tw-text-center">
      深圳生态环境群众诉求服务
    </h1>
    <van-form
      class="login_form tw-mt-[48px]"
      @submit="onSubmit">
      <van-field
        v-model="user.username"
        name="password"
        placeholder="请输入手机号"
        :rules="telPhoneCheck">
        <template #label>
          <div class="tw-flex tw-h-[24px] tw-items-center">
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
        v-model="user.smscode"
        placeholder="请输入验证码"
        :rules="smsCard">
        <template #label>
          <div class="tw-flex tw-h-[33px] tw-items-center">
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
            :disabled="isSend"
            style="border: none; color: #3189ff; font-size: 13px; background-color: #f9f9f9"
            @click="send">
            {{ sendSmsBtnText }}
          </van-button>
        </template>
      </van-field>
      <p class="forget tw-mt-[16px] tw-w-[100%] tw-pr-[14px]">
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

      <p class="tw-mx-auto tw-mt-[12px] tw-text-center tw-text-[16px] tw-text-[#666666]">
        <span @click="login">密码登录</span>
      </p>
      <p class="tw-mt-[138px] tw-pb-[50px] tw-text-center tw-text-[13px] tw-text-[#666666]">
        <span @click="register">用户注册</span>
      </p>
    </van-form>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Toast } from 'vant'
  import { mobileCode, passwordLogin } from '@/apis/index'
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
    try {
      const result = await passwordLogin({
        auth_type: 'sms',
        smscode: user.smscode,
        username: user.username
      })
      if (result.data.code === 0) {
        localStorage.setItem('token', result.data.data.token)
        Toast('登录成功')
        router.push('/index')
      } else {
        Toast('验证失败,请稍后尝试')
      }
    } catch (e) {
      Toast('服务器出错,验证失败')
    }
  }
  const forget = () => {
    router.push({ path: '/forget' })
  }
  const btn = ref()
  const sendSmsBtnText = ref('获取验证码')
  // 手机号正则校验
  const RegExpPhone = (val) => {
    return /^1\d{10}$/.test(val)
  }

  const send = async () => {
    //发送验证请求
    try {
      if (user.username && RegExpPhone(user.username)) {
        const result = await mobileCode({ mobile: user.username, type: 1 })
        if (result.data.code === 0) {
          isSend.value = true
          Toast('发送成功,请检查您的手机短信')
          let count = 60
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
        } else if (result.data.code === -1) {
          Toast('该手机号还未注册,请注册后登录')
          router.push('/register')
        } else {
          Toast(result.data.msg)
        }
      } else {
        // 弹出提示
        Toast('验证码发送失败,请检查你的手机号')
      }
    } catch (e) {
      Toast('服务器出错,发送失败')
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    color: #0084bd;
  }
  .forget {
    font-size: 13px;
    color: #666666;
    line-height: 13px;
    text-align: right;
    font-weight: 400;
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
