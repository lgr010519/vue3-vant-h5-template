<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-col">
    <nav-bar title="服务站点地址"></nav-bar>
    <div class="tw-flex-1 stations">
      <div class="stations_top">
        <p class="tw-font-semibold tw-mb-[12px]">工作时间</p>
        <p class="tw-font-medium tw-mb-[5px]">
          上午
          <span class="tw-ml-[12px]">09 : 00 - 12 : 00</span>
        </p>
        <p class="tw-font-medium">
          下午
          <span class="tw-ml-[12px]">14 : 00 - 18 : 00</span>
        </p>
      </div>

      <div
        class="stations_item"
        v-for="item in 10"
        :key="item">
        <div class="stations_item_info">
          <p class="tw-text-[17px] tw-text-[#4A4A4A] tw-font-semibold">环境局环境局环境局</p>
          <div class="tw-flex tw-mt-[6px]">
            <img
              class="tw-w-[16px] tw-h-[16px] tw-mr-[4px]"
              src="@/assets/images/wdsq/icon_address_blue.png"
              alt="" />
            <p class="tw-text-[11px] tw-text-[#999999] tw-font-medium">
              地址地址地址地地址地址地址地址地址
            </p>
          </div>
        </div>
        <div
          class="stations_item_info"
          v-for="childItem in 10"
          :key="childItem">
          <p class="tw-text-[17px] tw-text-[#4A4A4A] tw-font-semibold">环境局环境局环境局</p>
          <div class="tw-flex tw-mt-[6px]">
            <img
              class="tw-w-[16px] tw-h-[16px] tw-mr-[4px]"
              src="@/assets/images/wdsq/icon_address_blue.png"
              alt="" />
            <p class="tw-text-[11px] tw-text-[#999999] tw-font-medium">
              地址地址地址地址地址地址地址地址地址
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .stations {
    padding: 22px 14px;
    overflow: auto;
    &_top {
      width: 100%;
      height: 113px;
      padding: 14px;
      margin-bottom: 20px;
      background-color: #e5effb;
      border-radius: 6px;
      background-image: url('@/assets/images/wdsq/img_clock.png');
      background-repeat: no-repeat;
      background-position: top right;
      color: #4a4a4a;
    }
    &_item {
      margin-bottom: 20px;
      background-color: #ffffff;
      box-shadow: 0px 0px 13px 1px rgba(0, 0, 0, 0.03);
      border-radius: 6px;
      &_info {
        min-height: 75px;
        padding: 20px 14px 14px 14px;
        border-bottom: 1px solid #f4f4f4;
      }
    }
  }
</style>
