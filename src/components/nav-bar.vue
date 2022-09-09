<template>
  <div
    class="tw-flex tw-w-[100%] tw-h-[45px] tw-border-b-[1px] tw-border-[#E0E0E0] tw-items-center">
    <div class="tw-w-[100%] tw-h-[19px] tw-px-[14px] tw-flex tw-items-center">
      <!-- 图片 -->
      <img
        class="tw-w-[16px] tw-h-[16px] tw-mr-[14px]"
        src="@/assets/images/login/icon_left.png"
        alt=""
        @click="back" />
      <div
        class="tw-h-[19px] tw-text-[#4A4A4A] tw-text-[19px] tw-font-semibold tw-leading-[19px] tw-line-clamp-1">
        <span>{{ props.title }}啊的拉开房间离开的撒娇弗兰克的撒发记录卡</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  import { useRouter } from 'vue-router'
  const props = defineProps(['title'])
  const router = useRouter()
  const back = () => {
    router.back()
  }
</script>

<style></style>
