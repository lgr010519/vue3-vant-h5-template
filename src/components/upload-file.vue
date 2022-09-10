<template>
  <div class="file_list">
    <div
      class="file_list_item"
      v-for="item in fileList"
      :key="item.id"></div>
  </div>
  <van-uploader :after-read="handleAfterRead">
    <img
      src="@/assets/images/upload-file/button_add.png"
      alt="" />
  </van-uploader>
</template>

<script setup>
  defineProps({
    readonly: Boolean
  })

  function handleAfterRead() {}
</script>

<style lang="scss" scoped></style>
