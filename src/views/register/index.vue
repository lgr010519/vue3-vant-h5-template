<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col">
    <!-- < 用户注册 -->
    <nav-bar title="用户注册"></nav-bar>
    <!-- 注册表单 -->
    <div class="tw-flex-1 tw-w-[100%] tw-overflow-auto tw-px-[14px] tw-pt-[14px]">
      <van-form
        class="custom_van_form"
        @submit="onSubmit">
        <!-- 姓名 -->
        <van-field
          v-model="user.realName"
          name="realName"
          label="姓名"
          placeholder="请输入真实姓名"
          :rules="nameCheck">
        </van-field>
        <!-- 性别 -->
        <van-field
          name="gender"
          label="性别">
          <template #input>
            <van-radio-group
              v-model="user.gender"
              direction="horizontal">
              <van-radio name="1">男</van-radio>
              <div class="tw-w-[14px]"></div>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 身份证号 -->
        <van-field
          v-model="user.idCard"
          name="idCard"
          label="身份证号"
          placeholder="请输入身份证号"
          :rules="idCard">
        </van-field>
        <!-- 手机号 -->
        <van-field
          v-model="user.telPhone"
          name="telPhone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="telPhoneCheck">
        </van-field>
        <!-- 验证码 -->
        <van-field
          v-model="user.smsCode"
          label="验证码"
          placeholder="请输入验证码"
          :rules="smsCard">
          <template #button>
            <van-button
              size="mini"
              type="default"
              :disabled="isSend"
              style="border: none; color: #3189ff; background-color: #f9f9f9"
              @click="send">
              {{ sendSmsBtnText }}
            </van-button>
          </template>
        </van-field>
        <!-- 密码 -->
        <van-field
          v-model="user.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="passwordCheck">
        </van-field>
        <!-- 选择区域 -->
        <van-field
          v-model="spaceValue"
          is-link
          readonly
          label="地址"
          placeholder="请选择所在地区"
          :rules="userObjAddress"
          @click="show = true">
        </van-field>

        <van-popup
          v-model:show="show"
          round
          position="bottom">
          <van-cascader
            v-model="cascaderValue"
            :closeable="false"
            :show-header="false"
            :field-names="fieldNames"
            :options="options"
            active-color="#1989fa"
            @close="show = false"
            @finish="onFinish">
          </van-cascader>
        </van-popup>
        <!-- 详细地址 -->
        <van-field
          v-model="user.address"
          rows="2"
          autosize
          label=""
          type="textarea"
          placeholder="请输入详细地址"
          :rules="userAddress"
          show-word-limit>
        </van-field>

        <div class="tw-mx-auto tw-w-[347px] tw-h-[44px] tw-mt-[170px] tw-mb-[14px]">
          <van-button
            block
            type="primary"
            color="#3189FF"
            native-type="submit">
            确认注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
  import NavBar from '@/components/nav-bar.vue'
  import { reactive, ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { mobileCode, userRegister, getStreet } from '@/apis/index'
  import {
    passwordCheck,
    telPhoneCheck,
    idCard,
    nameCheck,
    smsCard,
    userObjAddress,
    userAddress
  } from '@/configs/globalvar'
  import { Toast } from 'vant'
  import sha256 from 'crypto-js/sha256'
  const router = useRouter()
  const user = reactive({
    realName: '', // 姓名
    gender: '1', // 性别
    idCard: '', // 身份证
    telPhone: '', // 手机号
    smsCode: '', //验证码
    password: '', //密码
    // 区级地址
    district: '',
    // 街道地址
    community: '',
    // 详细地址
    address: ''
  })
  const show = ref(false)
  const options = ref([])
  //自定义字段名
  const fieldNames = {
    text: 'name',
    value: 'name',
    children: 'streets'
  }
  // 地址拼接
  const spaceValue = ref('')
  // 手机号正则校验
  const RegExpPhone = (val) => {
    return /^1\d{10}$/.test(val)
  }
  const onFinish = ({ selectedOptions }) => {
    show.value = false
    if (selectedOptions[0].name) {
      user.district = selectedOptions[0].name
    }
    if (selectedOptions[1].name) {
      user.community = selectedOptions[1].name
    }
    spaceValue.value = selectedOptions.map((option) => option.name).join(' ')
  }
  //提交表单
  const onSubmit = async () => {
    try {
      const result = await userRegister({ ...user, password: sha256(user.password).toString() })
      if (result.data.code === 0) {
        Toast('注册成功')
        // 注册成功
        router.back()
      } else {
        Toast('注册失败,请稍等一会儿再尝试')
        // 注册成功
        router.back()
      }
    } catch (e) {
      Toast('服务器出错,请稍后尝试')
    }
  }
  const sendSmsBtnText = ref('获取验证码')
  const isSend = ref(false)
  // 发送验证码
  const send = async () => {
    //发送验证请求
    try {
      if (user.telPhone && RegExpPhone(user.telPhone)) {
        const result = await mobileCode({ mobile: user.telPhone })
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
  const cascaderValue = ref('')

  const getaddress = async () => {
    try {
      const result = await getStreet()
      if (result.data.code === 0) {
        options.value = result.data.data
      } else {
        Toast('获取街道信息失败')
      }
    } catch (e) {
      Toast('服务器出错,请稍后尝试')
    }
  }
  onMounted(() => {
    getaddress()
  })
</script>

<style lang="scss" scoped>
  .custom_van_form {
    @extend .custom_van_form;
    // padding: 14px 14px 0 14px;
  }
</style>
