<!-- 首页 -->
<template>
  <div class="home">
    <div
      v-if="false"
      class="home_item"
      :style="{
        backgroundImage: `url(${imgBlue})`,
        boxShadow: '4px 4px 8px 0px #C7DFFF'
      }"
      @click="onSelectItem('/jzxx/create')">
      <p
        class="home_item_text"
        style="color: #0047a7">
        局长信箱
      </p>
      <img
        class="home_item_img"
        src="@/assets/images/home/icon_email.png"
        alt="" />
    </div>
    <div
      class="home_item"
      :style="{
        backgroundImage: `url(${imgYellow})`,
        boxShadow: '4px 4px 8px 0px rgba(253,208,169,0.33)'
      }"
      @click="onSelectItem('/rmjy/create')">
      <p
        class="home_item_text"
        style="color: #c35a00">
        人民建议征集
      </p>
      <img
        class="home_item_img"
        src="@/assets/images/home/icon_suggest.png"
        alt="" />
    </div>
    <div
      class="home_item"
      :style="{
        backgroundImage: `url(${imgGreen})`,
        boxShadow: '4px 4px 8px 0px #C8E8E8'
      }"
      @click="onSelectItem('/wdsq')">
      <p
        class="home_item_text"
        style="color: #007b7b">
        我有诉求
      </p>
      <img
        class="home_item_img"
        src="@/assets/images/home/icon_appeal.png"
        alt="" />
    </div>
    <div
      class="home_item"
      :style="{
        backgroundImage: `url(${imgPink})`,
        boxShadow: '4px 4px 8px 0px #EBCAD0'
      }"
      @click="onSelectItem('/wdsx')">
      <p
        class="home_item_text"
        style="color: #a85463">
        我的事项
      </p>
      <img
        class="home_item_img"
        src="@/assets/images/home/icon_matter.png"
        alt="" />
    </div>
  </div>
</template>

<script setup>
  import imgBlue from '@/assets/images/home/img_blue.png'
  import imgYellow from '@/assets/images/home/img_yellow.png'
  import imgGreen from '@/assets/images/home/img_green.png'
  import imgPink from '@/assets/images/home/img_pink.png'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  /**
   * 选择某一个 item
   * @param {*} path
   */
  const onSelectItem = function (path) {
    router.push({
      path
    })
  }
</script>

<style lang="scss" scoped>
  .home {
    padding: 20px 15px;
    &_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100px;
      margin-bottom: 7px;
      padding: 0 40px 0 34px;
      border-radius: 16px;
      background-repeat: no-repeat;
      background-size: 100% 100px;
      &_text {
        font-size: 19px;
        font-weight: 600;
      }
      &_img {
        width: 52px;
        height: 52px;
      }
    }
  }
</style>
