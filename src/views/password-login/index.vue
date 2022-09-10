<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-overflow-auto">
    <div class="tw-w-[65px] tw-h-[60px] tw-mt-[70px] tw-mx-auto">
      <img
        src="../../assets/images/login/logo.png"
        class="width:100%;height:100%"
        alt="" />
    </div>

    <div class="title tw-h-[18px] tw-mt-[20px] tw-mx-auto tw-text-center">
      <span>深圳生态环境群众诉求服务</span>
    </div>

    <van-form
      @submit="onSubmit"
      class="tw-mt-[58px]">
      <van-cell-group inset>
        <van-field
          style="background-color: #f9f9f9"
          v-model="user.username"
          name="password"
          label=""
          placeholder="请输入手机号"
          left-icon="phone"
          :rules="[{ required: true, message: '请输入手机号' }]"
          class="tw-h-[60px]">
        </van-field>
        <van-field
          style="background-color: #f9f9f9"
          v-model="user.password"
          type="password"
          name="password"
          label=""
          left-icon="lock"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
          class="tw-h-[60px]">
        </van-field>
      </van-cell-group>
      <div class="forget tw-w-[100%] tw-h-[18px] tw-mt-[16px] tw-mr-[14px]">
        <span
          style="margin-right: 40px"
          @click="forget"
          >忘记密码</span
        >
      </div>
      <div style="margin: 16px">
        <van-button
          block
          type="primary"
          native-type="submit"
          color="#3189FF">
          登录
        </van-button>
      </div>

      <div
        class="tw-w-[100%] tw-h-[23px] tw-mx-auto tw-text-center tw-text-[16px] tw-text-[#666666] tw-leading-[23px]">
        <span
          class="tw-w-[81px] tw-h-[23px]"
          @click="verify"
          >验证码登录</span
        >
      </div>
    </van-form>
    <div
      class="tw-h-[18px] tw-mx-auto tw-text-center tw-text-[13px] tw-mt-[138px] tw-text-[#666666] tw-leading-[13px] tw-pb-[50px]">
      <span @click="register">用户注册</span>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const user = reactive({
    username: '',
    password: ''
  })
  const verify = () => {
    router.push({ path: '/verify' })
  }
  const register = () => {
    router.push({ path: '/register' })
  }
  const onSubmit = () => {
    router.push('/index')
  }
  const forget = () => {
    router.push({ path: '/forget' })
  }
</script>

<style lang="scss">
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
</style>
