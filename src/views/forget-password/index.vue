<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col">
    <nav-bar title="修改密码"></nav-bar>
    <div
      class="tw-w-[100%] tw-h-[32px] tw-bg-opacity-[0.12] tw-bg-[#F5754E] tw-flex tw-items-center">
      <div class="tw-w-[16px] tw-h-[16px] tw-ml-[14px]">
        <img
          src="../../assets/images/login/icon_warn.png"
          style="width: 100%; height: 100%" />
      </div>
      <div class="tw-h-[18px] tw-ml-[8px] tw-text-[13px] tw-leading-[18px] tw-text-[#F5754E]">
        <span>身份证号和手机号均验证通过才能进行密码修改</span>
      </div>
    </div>
    <div class="tw-flex-1 tw-w-[100%] tw-overflow-auto">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            label-width="65px"
            v-model="user.idCard"
            name="cardId"
            label="身份证号"
            placeholder="请输入身份证号"
            :rules="idCard"></van-field>
          <van-field
            label-width="65px"
            v-model="user.account"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            :rules="telPhoneCheck">
          </van-field>
          <van-field
            v-model="user.smsCode"
            label=" "
            label-width="45"
            left-icon="lock"
            placeholder="请输入验证码"
            :rules="smsCard"
            class="tw-h-[60px]">
            <template #button>
              <van-button
                ref="btn"
                size="small"
                type="default"
                @click="send"
                :disabled="isSend"
                style="border: none; color: #3189ff; font-size: 13px; background-color: #f9f9f9">
                {{ isSend ? '已发送' : '发送验证码' }}
              </van-button>
            </template>
          </van-field>
          <van-field
            class="password"
            label-width="65px"
            v-model="user.password"
            type="password"
            name="password"
            label="新密码"
            placeholder="请输入新密码,至少6位数,包含数字和字母"
            :rules="passwordCheck">
          </van-field>
        </van-cell-group>
        <div
          class="tw-mt-[350px] tw-w-[347px] tw-h-[44px] tw-mx-auto tw-text-[16px] tw-font-medium">
          <van-button
            style="border-radius: 6px 6px 6px 6px"
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
  import { updatePassword, mobileCode } from '@/api/index'
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
    const result = await updatePassword({
      idCard: user.idCard,
      account: user.account,
      password: sha256(user.password).toString(),
      smsCode: user.smsCode
    })
    console.log(result)
    if (result.data.data.message === '密码修改成功') {
      Toast('密码修改成功')
      router.back()
    }
  }
  // 手机号正则校验
  const RegExpPhone = (val) => {
    console.log(val)
    return /^1\d{10}$/.test(val)
  }
  const isSend = ref(false)
  // 发送验证码
  const send = async () => {
    //发送验证请求
    if (user.account && RegExpPhone(user.account)) {
      const result = await mobileCode({ mobile: user.account })
      if (result.status === 200) {
        isSend.value = true
        Toast('发送成功,请检查您的手机短信')
      }
    } else {
      // 弹出提示
      Toast('验证码发送失败,请检查你的手机号')
    }
  }
</script>

<style lang="scss" scoped></style>
