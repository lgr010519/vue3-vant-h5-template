<template>
  <div class="tw-w-[100%]">
    <img
      src="../assets/icon/login/logo.png"
      class="logo tw-mx-auto"
      alt=""
    >

    <div class="title  tw-h-[18px] tw-mt-[20px] tw-mx-auto tw-text-center">
      <span>深圳生态环境群众诉求服务</span>
    </div>

    <van-form @submit="onSubmit" class="tw-mt-[58px]" :v-model="form">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button
          
          block
          type="primary"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
const form = ref({
  userName:'',
  password:''
})
</script>

<style lang="scss">
  .logo {
    display: block;
    width: 65px;
    height: 60px;
  }
.title {
  font-size: 18px;
  font-weight: 600;
  color: #0084bd;
  line-height: 18px;
}
</style>
