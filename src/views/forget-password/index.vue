<template>
  <div class="tw-w-[100%]">
    <title-vue title="修改密码"></title-vue>
    <div class="tw-w-[100%] tw-h-[32px] tw-bg-opacity-[0.12] tw-bg-[#F5754E] tw-flex tw-items-center">
      <div class="tw-w-[16px] tw-h-[16px] tw-ml-[14px]"><img
          src="../../assets/images/login/icon_warn.png"
          style="width:100%;height:100%"
          alt=""
        ></div>
      <div class="tw-h-[18px] tw-ml-[8px] tw-text-[13px] tw-leading-[18px] tw-text-[#F5754E]"><span>身份证号和手机号均验证通过才能进行密码修改</span></div>
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
        label-width="65px"
          v-model="user.cardId"
          name="cardId"
          label="身份证号"
          placeholder="请输入身份证号"
          :rules="[{ required: true, message: '请输入身份证号' }]"
        />
        <van-field
        label-width="65px"
          v-model="user.phone"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入手机号' }]"
        />
        <van-field
          label-width="65px"
          v-model="user.password"
          type="password"
          name="password"
          label="新密码"
          placeholder="请输入新密码，至少6位数，包含数字和字母"
          :rules="[{ required: true, message: '请输入新密码，至少6位数，包含数字和字母' }]"
        />
      </van-cell-group>
      <div class="tw-mt-[350px] tw-w-[347px] tw-h-[44px] tw-mx-auto tw-text-[16px] tw-font-medium">
        <van-button
          style="border-radius: 6px 6px 6px 6px;"
          block
          type="primary"
          native-type="submit"
        >
          确认修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import titleVue from '@/components/title.vue';
import { reactive } from 'vue';
const user = reactive({
  cardId:'',
  phone:'',
  password:''
})

onSubmit
</script>

<style lang="less" scoped>
</style>