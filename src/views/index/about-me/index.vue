<!-- 我的 -->
<template>
  <div class="about_me">
    <div class="about_me_part">
      <div class="about_me_part-title">
        <img
          class="tw-w-[20px] tw-h-[20px]"
          src="@/assets/images/about-me/icon_information.png"
          alt="" />
        <p class="tw-text-[17px] tw-font-semibold tw-ml-[8px]">基本信息</p>
      </div>
      <div class="about_me_part-info info">
        <div class="info_item">
          <p class="info_item_label">姓名</p>
          <p class="info_item_value">{{ userInfo.name }}</p>
        </div>
        <div class="info_item">
          <p class="info_item_label">性别</p>
          <p class="info_item_value">{{ userInfo.gender }}</p>
        </div>
        <div class="info_item">
          <p class="info_item_label">身份证号</p>
          <p class="info_item_value">{{ userInfo.name }}</p>
        </div>
        <div class="info_item">
          <p class="info_item_label">手机号</p>
          <p class="info_item_value">{{ userInfo.name }}</p>
        </div>
        <div class="info_item">
          <p class="info_item_label">地址</p>
          <p class="info_item_value">
            <span>{{ userInfo.address[0] }}</span>
            <span>{{ userInfo.address[1] }}</span>
          </p>
        </div>
        <div class="!tw-mb-0 info_item">
          <p class="info_item_label"></p>
          <p class="info_item_value">{{ userInfo.address[2] }}</p>
        </div>
      </div>
    </div>
    <div
      class="about_me_part"
      @click="onSignOut">
      <div class="about_me_part-title">
        <img
          class="tw-w-[20px] tw-h-[20px]"
          src="@/assets/images/about-me/icon_quit.png"
          alt="" />
        <p class="tw-text-[17px] tw-font-semibold tw-ml-[8px]">退出系统</p>
      </div>
    </div>
    <div
      class="about_me_part tw-flex tw-justify-between tw-items-center"
      @click="router.push('/system-code')">
      <div class="about_me_part-title">
        <img
          class="tw-w-[20px] tw-h-[20px]"
          src="@/assets/images/about-me/icon_code.png"
          alt="" />
        <p class="tw-text-[17px] tw-font-semibold tw-ml-[8px]">系统二维码</p>
      </div>
      <img
        class="tw-w-[16px] tw-h-[16px]"
        src="@/assets/images/about-me/icon_right.png"
        alt="" />
    </div>

    <van-action-sheet
      v-model:show="showActionSheet"
      :actions="actionSheetOptions"
      cancel-text="取消"
      close-on-click-action
      :round="false"
      @select="onSelectAction"
      @cancel="onCancelSignOut">
    </van-action-sheet>
  </div>
</template>

<script setup>
  import { Toast } from 'vant'
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const userInfo = reactive({
    name: '1',
    gender: '2',
    idCard: '3',
    mobile: '4',
    address: ['5', '6', 'qqqqqqqqqqq1111111111123121312']
  })

  const showActionSheet = ref(false)
  const actionSheetOptions = [{ name: '确认' }]
  /**
   * 点击退出系统
   */
  const onSignOut = function () {
    showActionSheet.value = true
  }
  /**
   * 选择动作
   * @param {*} action
   * @param {*} index
   */
  const onSelectAction = function (action, index) {
    console.log(action, index)
  }
  /**
   * 取消选择
   */
  const onCancelSignOut = function () {
    Toast('已取消')
  }
</script>

<style lang="scss" scoped>
  .about_me {
    padding: 24px 14px;
    &_part {
      padding: 24px 14px;
      margin-bottom: 24px;
      background: rgba(255, 255, 255, 0.44);
      box-shadow: 0px 0px 13px 1px rgba(0, 0, 0, 0.03);
      &-title {
        display: flex;
        align-items: center;
      }
      &-info {
        margin-top: 18px;
      }
    }
    .info {
      &_item {
        display: flex;
        margin-bottom: 12px;
        font-size: 16px;
        font-weight: 600;
        &_label {
          width: 90px;
          min-width: 90px;
          color: #666666;
        }
        &_value {
          flex: 1;
          color: #4a4a4a;
          word-break: break-all;
        }
      }
    }
  }
</style>
