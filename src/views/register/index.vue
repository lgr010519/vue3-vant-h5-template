<template>
  <div class="tw-w-[100%]">
    <!-- < 用户注册 -->
    <div class="tw-flex tw-w-[100%] tw-h-[43px] tw-border-b-[1px] tw-border-[#E0E0E0] tw-items-center">
      <div class="tw-w-[100%] tw-h-[19px] tw-flex tw-items-center">
        <!-- 图片 -->
        <div
          class="tw-w-[16px] tw-h-[16px] tw-ml-[14px]"
          @click="back"
        ><img
            src="../../assets/images/login/icon_left.png"
            alt=""
          ></div>
        <!-- 用户注册 -->
        <div class="tw-ml-[14px] tw-h-[19px] tw-text-[#4A4A4A] tw-text-[19px] tw-font-medium tw-leading-[19px]"><span>用户注册</span></div>
      </div>
    </div>

    <!-- 注册表单 -->
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- 姓名 -->
        <van-field
          v-model="user.name"
          name="name"
          label="姓名"
          placeholder="请输入真实姓名"
          :rules="[{ required: true, message: '请填写您的真实姓名' }]"
        />
        <!-- 性别 -->
        <van-field
          name="sex"
          label="性别"
        >
          <template #input>
            <van-radio-group
              v-model="user.sex"
              direction="horizontal"
            >
              <van-radio name="male">男</van-radio>
              <div class="tw-w-[14px]"></div>
              <van-radio name="female">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 身份证号 -->
        <van-field
          v-model="user.cardId"
          name="cardId"
          label="身份证号"
          placeholder="请输入身份证号"
          :rules="[{ required: true, message: '请正确输入您的身份证号' }]"
        />
        <!-- 手机号 -->
        <van-field
          v-model="user.phone"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入您的手机号' }]"
        />
        <!-- 验证码 -->
        <van-field
          v-model="user.verifycode"
          label=""
          left-icon="lock"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]">
          <template #button>
            <van-button
              size="mini"
              type="default"
              style="border:none;color: #3189FF;"
            >发送验证码</van-button>
          </template>
        </van-field>
        <!-- 选择区域 -->
        <van-field
          v-model="spaceValue"
          is-link
          readonly
          label="地址"
          placeholder="请选择所在地区"
          @click="show = true"
        />
        <van-popup
          v-model:show="show"
          round
          position="bottom"
          
        >
          <van-cascader
            v-model="cascaderValue"
            title="请选择所在地区"
            :options="options"
            @close="show = false"
            @finish="onFinish"
          />
        </van-popup>
        <!-- 详细地址 -->
        <van-field
          v-model="message"
          rows="2"
          autosize
          label=""
          type="textarea"
          placeholder="请输入详细地址"
          show-word-limit
        />
      </van-cell-group>

      <div class="tw-mx-auto tw-w-[347px] tw-h-[44px] tw-mt-[170px]">
        <van-button
          block
          type="primary"
          native-type="submit"
        >
          确认注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
const user = reactive({
  name: '',// 姓名
  sex: '',// 性别
  cardId: '',// 身份证
  phone: '',// 手机号
  verifycode:'',//验证码
  text:''
})
const show = ref(false)
// const route = useRoute()
const router = useRouter()
const back = () => {
  router.back()
}
const options = ref([
  {
    text: '浙江省',
    value: '330000',
    children: [{ text: '杭州市', value: '330100' }],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [{ text: '南京市', value: '320100' }],
  },
])
// 地址拼接
const spaceValue = ref('')
const onFinish = ({ selectedOptions }) => {
  show.value = false;
  spaceValue.value = selectedOptions.map((option) => option.text).join('/');
};
const message = ref('')
//提交表单
const onSubmit = ()=>{
  user.text = spaceValue.value +'/'+ message.value
}
</script>

<style>
</style>