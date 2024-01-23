<template>
  <div class="tw-h-[100%] tw-w-[100%] tw-overflow-auto">
    <img
      src="../../assets/images/login/logo.png"
      class="tw-mx-auto tw-mt-[70px] tw-h-[60px] tw-w-[65px]"
      alt="" />
    <h1 class="title tw-mt-[20px] tw-text-center">深圳生态环境群众诉求服务</h1>
    <VanForm class="login_form tw-mt-[48px]">
      <VanField
        v-model="user.username"
        name="username"
        placeholder="请输入手机号">
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
      </VanField>
      <VanField
        type="password"
        name="password"
        placeholder="请输入密码">
        <template #label>
          <div class="tw-flex tw-h-[24px] tw-items-center">
            <img
              src="../../assets/images/login/icon_password.png"
              alt=""
              width="20"
              height="20" />
          </div>
        </template>
      </VanField>
      <p class="forget tw-mt-[16px] tw-w-[100%] tw-pr-[14px]">
        <span>忘记密码</span>
      </p>
      <div class="tw-mx-[14px] tw-mt-[36px]">
        <VanButton
          block
          type="primary"
          native-type="submit"
          color="#3189FF">
          登录
        </VanButton>
      </div>
    </VanForm>
    <p class="tw-mt-[12px] tw-text-center tw-text-[16px] tw-text-[#666666]">
      <span>验证码登录</span>
    </p>
    <p
      class="tw-mt-[138px] tw-pb-[50px] tw-text-center tw-text-[13px] tw-text-[#666666]">
      <span>用户注册</span>
    </p>
    <!-- <div class="warn">
        <p>系统下线维护中，如有环境诉求请拨打热线电话12345或12369，感谢市民理解与支持。</p>
      </div> -->
  </div>
</template>

<script setup>
  import { reactive } from 'vue'

  import { usePagination } from '@/utils/hook'
  console.log(usePagination)
  const user = reactive({
    auth_type: '1',
    username: '',
    password: '',
  })
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
  .warn {
    color: red;
    padding: 25px;
    margin-top: 20px;
  }
</style>
