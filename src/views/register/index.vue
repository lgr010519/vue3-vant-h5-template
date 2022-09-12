<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col">
    <!-- < 用户注册 -->
    <nav-bar title="用户注册"></nav-bar>
    <!-- 注册表单 -->
    <div class="tw-flex-1 tw-w-[100%] tw-overflow-auto">
      <van-form
        class="custom_van_form"
        @submit="onSubmit">
        <van-cell-group inset>
          <!-- 姓名 -->
          <van-field
            style="background-color: #f9f9f9"
            v-model="user.realName"
            name="name"
            label-width="70"
            label="姓名"
            placeholder="请输入真实姓名"
            :rules="nameCheck"></van-field>
          <!-- 性别 -->
          <van-field
            name="sex"
            label-width="70"
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
            style="background-color: #f9f9f9"
            v-model="user.idCard"
            name="cardId"
            label="身份证号"
            label-width="70"
            placeholder="请输入身份证号"
            :rules="idCard" />
          <!-- 手机号 -->
          <van-field
            style="background-color: #f9f9f9"
            v-model="user.telPhone"
            name="phone"
            label="手机号"
            label-width="70"
            placeholder="请输入手机号"
            :rules="telPhoneCheck">
          </van-field>
          <!-- 验证码 -->
          <van-field
            style="background-color: #f9f9f9"
            v-model="user.smsCode"
            label=" "
            left-icon="chat-o"
            label-width="50"
            placeholder="请输入验证码"
            :rules="smsCard">
            <template #button>
              <van-button
                size="mini"
                type="default"
                :disabled="isSend"
                @click="send"
                style="border: none; color: #3189ff; background-color: #f9f9f9"
                >{{ isSend ? '已发送' : '发送验证码' }}
              </van-button>
            </template>
          </van-field>
          <!-- 密码 -->
          <van-field
            style="background-color: #f9f9f9"
            v-model="user.password"
            type="password"
            name="password"
            label=" "
            label-width="50"
            left-icon="lock"
            placeholder="请输入密码"
            :rules="passwordCheck">
          </van-field>
          <!-- 选择区域 -->
          <van-field
            v-model="spaceValue"
            is-link
            readonly
            label="地址"
            label-width="70"
            placeholder="请选择所在地区"
            @click="show = true">
          </van-field>

          <van-popup
            v-model:show="show"
            round
            position="bottom">
            <van-cascader
              :fieldNames="fieldNames"
              v-model="cascaderValue"
              :options="options"
              @close="show = false"
              closeable
              @finish="onFinish">
            </van-cascader>
          </van-popup>
          <!-- 详细地址 -->
          <van-field
            style="background-color: #f9f9f9"
            v-model="user.address"
            rows="2"
            autosize
            label=""
            type="textarea"
            placeholder="请输入详细地址"
            show-word-limit>
          </van-field>
        </van-cell-group>

        <div class="tw-mx-auto tw-w-[347px] tw-h-[44px] tw-mt-[170px] tw-pb-[80px]">
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
  import { mobileCode, userRegister, getStreet } from '@/api/index'
  import { passwordCheck, telPhoneCheck, idCard, nameCheck, smsCard } from '@/configs/globalvar'
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
    if (selectedOptions[0].text) {
      user.district = selectedOptions[0].text
    }
    if (selectedOptions[1].text) {
      user.community = selectedOptions[1].text
    }
    spaceValue.value = selectedOptions.map((option) => option.text).join(' ')
  }
  //提交表单
  const onSubmit = async () => {
    user.password = sha256(user.password).toString()
    const result = await userRegister(user)
    if (result.data.msg == 'ok') {
      Toast('注册成功')
      // 注册成功
      router.back()
    } else {
      Toast('注册失败,请稍等一会儿再尝试')
      // 注册成功
      router.back()
    }
  }
  const isSend = ref(false)
  // 发送验证码
  const send = async () => {
    //发送验证请求
    if (user.telPhone && RegExpPhone(user.telPhone)) {
      const result = await mobileCode({ mobile: user.telPhone })
      if (result.status === 200) {
        isSend.value = true
        Toast('发送成功,请检查您的手机短信')
      }
    } else {
      // 弹出提示
      Toast('验证码发送失败,请检查你的手机号')
    }
  }
  const cascaderValue = ref('')

  const getaddress = async () => {
    const result = await getStreet()
    console.log('街道', result)
    if (result.data.data) {
      options.value = result.data.data
    } else {
      Toast('获取街道信息失败')
    }
  }
  onMounted(() => {
    getaddress()
  })
</script>

<style lang="scss" scoped>
  .custom_van_form {
    @extend .custom_van_form;
  }
</style>
