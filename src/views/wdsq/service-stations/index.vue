<template>
  <div class="tw-flex tw-h-full tw-w-full tw-flex-col">
    <nav-bar title="服务站点地址"></nav-bar>
    <div class="stations tw-flex-1">
      <!-- <div class="stations_top">
        <p class="tw-mb-[12px] tw-font-semibold">工作时间工作日:</p>
        <p class="tw-mb-[5px] tw-font-medium">
          上午
          <span class="tw-ml-[12px]">09 : 00 - 12 : 00</span>
        </p>
        <p class="tw-font-medium">
          下午
          <span class="tw-ml-[12px]">14 : 00 - 18 : 00</span>
        </p>
      </div> -->

      <div
        v-for="(value, key) in stations"
        ref="el"
        :key="key"
        class="stations_item tw-pt-[10px]">
        <div
          class="tw-ml-[12px] tw-pb-[5px]"
          style="border-bottom: 1px solid #f4f4f4">
          <p class="tw-text-[17px] tw-font-semibold tw-text-[#4A4A4A]">
            {{ value.serviceStationVo.pname }}
          </p>
          <div class="tw-my-[5px] tw-mt-[6px] tw-flex">
            <img
              class="tw-mr-[4px] tw-h-[16px] tw-w-[16px]"
              src="@/assets/images/wdsq/icon_address_blue.png"
              alt="" />
            <p class="tw-text-[11px] tw-font-medium tw-text-[#999999]">
              {{ value.serviceStationVo.address }}
            </p>
          </div>
          <div class="tw-my-[5px] tw-mt-[6px] tw-flex">
            <img
              class="tw-mr-[4px] tw-h-[16px] tw-w-[16px]"
              src="@/assets/images/wdsq/icon_phone.png"
              alt="" />
            <p class="tw-text-[11px] tw-font-medium tw-text-[#999999]">
              {{ value.serviceStationVo.phone }}
            </p>
          </div>
        </div>

        <div
          v-for="station in value.children"
          :key="station.pid"
          class="stations_item_info">
          <p class="tw-text-[17px] tw-font-semibold tw-text-[#4A4A4A]">{{ station.ename }}</p>
          <div class="tw-mt-[8px] tw-flex">
            <img
              class="tw-mr-[4px] tw-h-[16px] tw-w-[16px]"
              src="@/assets/images/wdsq/icon_address_blue.png"
              alt="" />
            <p class="tw-text-[11px] tw-font-medium tw-text-[#999999]">
              {{ station.address }}
            </p>
          </div>
          <div class="tw-mt-[8px] tw-flex">
            <img
              class="tw-mr-[4px] tw-h-[16px] tw-w-[16px]"
              src="@/assets/images/wdsq/icon_phone.png"
              alt="" />
            <p class="tw-text-[11px] tw-font-medium tw-text-[#999999]">
              {{ station.phone }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div>
        <div
          v-for="(item, index) in stations"
          :key="index"
          class="stations_item tw-p-[10px]">
          <div class="tw-flex tw-justify-between">
            <p class="tw-text-[17px] tw-font-semibold tw-text-[#4A4A4A]">{{ item.pname }}</p>
            <p class="tw-text-[14px] tw-font-semibold tw-text-[#4A4A4A]">{{ item.phone }}</p>
          </div>
          <div class="tw-mt-[6px] tw-flex">
            <img
              class="tw-mr-[4px] tw-h-[16px] tw-w-[16px]"
              src="@/assets/images/wdsq/icon_address_blue.png"
              alt="" />
            <p class="tw-text-[11px] tw-font-medium tw-text-[#999999]">
              {{ item.address }}
            </p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
  import { getStationList } from '@/apis'
  import { Toast } from 'vant'
  import { onMounted, ref } from 'vue'
  onMounted(() => {
    getStations()
  })
  const stations = ref([])
  const getStations = () => {
    getStationList()
      .then((res) => {
        if (res.data.code === 0) {
          // 刷新
          stations.value = res.data.data
        } else {
          Toast(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
</script>

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
