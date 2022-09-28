<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col">
    <nav-bar title="修改密码"></nav-bar>
    <div
      class="tw-w-[100%] tw-h-[32px] tw-bg-opacity-[0.12] tw-bg-[#F5754E] tw-flex tw-items-center">
      <img
        src="../../assets/images/login/icon_warn.png"
        class="tw-w-[16px] tw-h-[16px] tw-ml-[14px]" />
      <p class="tw-h-[18px] tw-ml-[8px] tw-text-[13px] tw-leading-[18px] tw-text-[#F5754E]">
        身份证号和手机号均验证通过才能进行密码修改
      </p>
    </div>
    <div class="tw-flex-1 tw-w-[100%] tw-overflow-auto">
      <van-form
        class="forget_form tw-mt-[16px]"
        @submit="onSubmit">
        <van-field
          v-model="user.idCard"
          name="idCard"
          label="身份证号"
          placeholder="请输入身份证号"
          :rules="idCard">
        </van-field>
        <van-field
          v-model="user.account"
          name="account"
          label="手机号"
          placeholder="请输入手机号"
          :rules="telPhoneCheck">
        </van-field>
        <van-field
          v-model="user.smsCode"
          label="验证码"
          name="smsCode"
          placeholder="请输入验证码"
          :rules="smsCard">
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
        <van-field
          v-model="user.password"
          class="password"
          type="password"
          name="password"
          label="新密码"
          placeholder="请输入新密码,至少10位数,包含数字和字母"
          :rules="passwordCheck">
        </van-field>
        <div class="tw-mt-[300px] tw-mx-[14px] tw-h-[44px] tw-text-[16px] tw-font-medium">
          <van-button
            block
            type="primary"
            native-type="submit">
            确认修改
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
  import NavBar from '@/components/nav-bar.vue'
  import { passwordCheck, telPhoneCheck, idCard } from '@/configs/globalvar'
  import { updatePassword, mobileCode } from '@/apis/index'
  import { reactive, ref } from 'vue'
  import { smsCard } from '@/configs/globalvar'
  import { useRouter } from 'vue-router'
  import sha256 from 'crypto-js/sha256'
  import { Toast } from 'vant'
  const router = useRouter()
  const user = reactive({
    idCard: '',
    account: '',
    password: '',
    smsCode: ''
  })

  const onSubmit = async () => {
    try {
      const result = await updatePassword({
        ...user,
        password: sha256(user.password).toString()
      })
      if (result.data.code === 0) {
        Toast('密码修改成功')
        router.back()
      }
    } catch (e) {
      Toast('服务器出错,请稍后尝试')
    }
  }
  const sendSmsBtnText = ref('获取验证码')
  // 手机号正则校验
  const RegExpPhone = (val) => {
    return /^1\d{10}$/.test(val)
  }
  const isSend = ref(false)
  // 发送验证码
  const send = async () => {
    //发送验证请求

    try {
      if (user.account && RegExpPhone(user.account)) {
        const result = await mobileCode({ mobile: user.account, type: 1 })
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
    } catch (e) {
      Toast('服务器出错,请稍后尝试')
    }
  }
</script>

<style lang="scss" scoped>
  .forget_form.van-form {
    padding: 14px 14px;
    @extend .custom_van_form;
  }
</style>
