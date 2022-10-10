<template>
  <div class="tw-flex tw-h-full tw-w-full tw-flex-col">
    <nav-bar title="系统二维码"></nav-bar>
    <div class="appeal tw-flex-1">
      <router-link
        v-slot="{ navigate }"
        to="/wdsq/service-note"
        custom>
        <div
          class="appeal_part"
          @click="navigate">
          <div class="tw-flex">
            <img
              class="tw-mt-[3px] tw-h-[20px] tw-w-[20px]"
              src="@/assets/images/wdsq/icon_warn.png"
              alt="" />
            <p class="tw-ml-[14px] tw-text-[17px] tw-font-semibold tw-text-[#0062E5]">
              深圳生态环境群众诉求服务平台反映问题说明
            </p>
          </div>
        </div>
      </router-link>
      <router-link
        v-slot="{ navigate }"
        to="/wdsq/service-stations"
        custom>
        <div
          class="appeal_part"
          @click="navigate">
          <div class="tw-flex">
            <img
              class="tw-mt-[3px] tw-h-[20px] tw-w-[20px]"
              src="@/assets/images/wdsq/icon_address.png"
              alt="" />
            <p class="tw-ml-[14px] tw-text-[17px] tw-font-semibold tw-text-[#4A4A4A]">
              服务站点地址查看
            </p>
          </div>
          <p class="tw-ml-[34px] tw-text-[11px] tw-font-medium tw-text-[#999999]">
            如有诉求也可直接到已开设的深圳生态环境群众服务站点反映
          </p>
        </div>
      </router-link>
      <router-link
        v-slot="{ navigate }"
        to="/wdsq/appeal/create"
        custom>
        <div
          class="appeal_part"
          @click="navigate">
          <div class="tw-flex">
            <img
              class="tw-mt-[3px] tw-h-[20px] tw-w-[20px]"
              src="@/assets/images/wdsq/icon_reflect.png"
              alt="" />
            <p class="tw-ml-[14px] tw-text-[17px] tw-font-semibold tw-text-[#4A4A4A]">
              在线反映诉求
            </p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .appeal {
    padding: 22px 14px;
    &_part {
      background: #ffffff;
      margin-bottom: 20px;
      box-shadow: 0px 0px 13px 1px rgba(0, 0, 0, 0.03);
      padding: 12px 20px;
      border-radius: 6px;
    }
  }
</style>
