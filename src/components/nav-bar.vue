<template>
  <div
    class="tw-flex tw-w-[100%] tw-h-[45px] tw-border-b-[1px] tw-border-[#E0E0E0] tw-items-center">
    <div class="tw-w-[100%] tw-h-[19px] tw-flex tw-items-center">
      <!-- 图片 -->
      <div
        class="tw-w-[16px] tw-h-[16px] tw-ml-[14px]"
        @click="back">
        <img
          src="@/assets/images/login/icon_left.png"
          alt="" />
      </div>
      <div
        class="tw-ml-[14px] tw-h-[19px] tw-text-[#4A4A4A] tw-text-[19px] tw-font-semibold tw-leading-[19px]">
        <span>{{ props.title }}</span>
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
