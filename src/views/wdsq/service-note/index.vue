<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-col">
    <nav-bar title="服务说明"></nav-bar>
    <div class="service_note tw-flex-1">
      <p class="service_note_title">深圳生态环境群众诉求服务平台反映问题说明</p>
      <div class="service_note_body">
        <br
          v-for="item in 100"
          :key="item" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .service_note {
    padding: 22px 14px;
    overflow: auto;
    &_title {
      color: #4a4a4a;
      font-size: 19px;
      font-weight: 600;
    }
    &_body {
      margin-top: 20px;
    }
  }
</style>
