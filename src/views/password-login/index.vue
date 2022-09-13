<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-overflow-auto">
    <div class="tw-w-[65px] tw-h-[60px] tw-mt-[70px] tw-mx-auto">
      <img
        src="../../assets/images/login/logo.png"
        class="width:100%;height:100%"
        alt="" />
    </div>

    <h1 class="title tw-mt-[20px] tw-text-center">深圳生态环境群众诉求服务</h1>

    <van-form
      class="login_form tw-mt-[48px]"
      @submit="onSubmit">
      <van-field
        v-model="user.username"
        name="username"
        placeholder="请输入手机号"
        :rules="telPhoneCheck">
        <template #label>
          <img
            class=""
            src="../../assets/images/login/icon_phone.png"
            alt=""
            width="20"
            height="20" />
        </template>
      </van-field>
      <van-field
        v-model="user.password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="passwordCheck">
        <template #label>
          <img
            src="../../assets/images/login/icon_password.png"
            alt=""
            width="20"
            height="20" />
        </template>
      </van-field>
      <p
        class="forget tw-w-[100%] tw-mt-[16px] tw-pr-[14px]"
        @click="forget">
        忘记密码
      </p>

      <div class="tw-mx-[14px] tw-mt-[36px]">
        <van-button
          block
          type="primary"
          native-type="submit"
          color="#3189FF">
          登录
        </van-button>
      </div>
    </van-form>

    <p
      class="tw-text-center tw-text-[16px] tw-text-[#666666] tw-mt-[12px]"
      @click="verify">
      验证码登录
    </p>

    <p
      class="tw-text-center tw-text-[13px] tw-text-[#666666] tw-mt-[138px] tw-pb-[50px]"
      @click="register">
      用户注册
    </p>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { passwordLogin } from '@/api/index'
  import SHA256 from 'crypto-js/sha256'
  import { passwordCheck, telPhoneCheck } from '@/configs/globalvar'
  import { Toast } from 'vant'
  const router = useRouter()
  const user = reactive({
    auth_type: '1',
    username: '',
    password: ''
  })
  const verify = () => {
    router.push({ path: '/verify' })
  }
  const register = () => {
    router.push({ path: '/register' })
  }
  const onSubmit = async () => {
    console.log(123321)
    const result = await passwordLogin({
      auth_type: '1',
      password: SHA256(user.password).toString(),
      username: user.username
    })
    if (result.data.code === 0) {
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
    line-height: 18px;
    text-align: right;
  }

  .login_form.van-form {
    padding: 0 14px;
    @extend .custom_van_form;
    :deep(.van-cell.van-field) {
      .van-field__label {
        width: 20px;
        margin-right: 20px;
      }
    }

    .van-cell::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      bottom: 0;
      transform: scaleY(0.5);
    }
  }
</style>
