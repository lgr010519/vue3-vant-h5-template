<template>
  <div class="index">
    <div class="index_top">
      <img
        class="index_top_logo"
        src="@/assets/images/index/logo_small.png"
        alt="" />
      <p class="index_top_title">深圳生态环境群众诉求服务</p>
    </div>
    <div class="index_main">
      <router-view></router-view>
    </div>
    <div class="index_bottom">
      <van-tabbar
        v-model="activeTabBar"
        :border="true"
        :route="true"
        inactive-color=""
        active-color="#3189FF"
        :fixed="false">
        <van-tabbar-item
          name="home"
          to="/index/home">
          <span>主页</span>
          <template #icon="props">
            <img
              v-if="props.active"
              src="@/assets/images/index/icon_home_active.png"
              alt="" />
            <img
              v-else
              src="@/assets/images/index/icon_home.png"
              alt="" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item
          name="about-me"
          to="/index/about-me">
          <span>我的</span>
          <template #icon="props">
            <img
              v-if="props.active"
              src="@/assets/images/index/icon_mine_active.png"
              alt="" />
            <img
              v-else
              src="@/assets/images/index/icon_mine.png"
              alt="" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const activeTabBar = ref('')
</script>

<style lang="scss" scoped>
  .index {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 45px 1fr 50px;
    grid-template-areas:
      'index_top'
      'index_main'
      'index_bottom';
    &_top {
      grid-area: index_top;
      height: 45px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      &_logo {
        width: 28px;
        height: 28px;
        margin-left: 14px;
        margin-right: 17px;
      }
      &_title {
        color: #0084bd;
        font-size: 16px;
        font-weight: bold;
      }
    }
    &_main {
      grid-area: index_main;
    }
    &_bottom {
      grid-row: index_bottom;
    }
  }
</style>
