<!-- 首页 -->
<template>
  <div class="home">
    <div
      class="home_item"
      :style="`background-image: url(${imgBlue});  box-shadow: 4px 4px 8px 0px #C7DFFF`">
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
        backgroundImage: `url(${imgYellow})`
      }">
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
        backgroundImage: `url(${imgGreen})`
      }">
      <p
        class="home_item_text"
        style="color: #007b7b">
        我的诉求
      </p>
      <img
        class="home_item_img"
        src="@/assets/images/home/icon_appeal.png"
        alt="" />
    </div>
    <div
      class="home_item"
      :style="{
        backgroundImage: `url(${imgPink})`
      }">
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
      &_text {
        font-size: 19px;
        font-weight: bold;
      }
      &_img {
      }
    }
  }
</style>
