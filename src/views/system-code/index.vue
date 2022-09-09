<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-col">
    <nav-bar title="系统二维码"></nav-bar>
    <div class="system_code tw-flex-1">
      <div class="system_code_panel">
        <div
          class="system_code_panel-img"
          ref="qrCodeImg"></div>
        <p class="system_code_panel-tip">长按二维码保存到本地</p>
      </div>
    </div>
  </div>

  <van-action-sheet
    v-model:show="showActionSheet"
    :actions="actionSheetOptions"
    cancel-text="取消"
    close-on-click-action
    :round="false"
    @select="onSelectAction">
  </van-action-sheet>
</template>

<script setup>
  import QRCodeStyling from 'qr-code-styling'
  import { onMounted, ref } from 'vue'
  import qrCodeOptions from './options'
  import logo from '@/assets/images/login/logo.png'
  import Hammer from 'hammerjs'

  const qrCode = new QRCodeStyling(qrCodeOptions)
  const qrCodeImg = ref(null)
  function initQrCode() {
    console.log(qrCodeImg.value)
    qrCodeOptions.width = qrCodeImg.value.offsetWidth
    qrCodeOptions.height = qrCodeImg.value.offsetHeight
    qrCodeOptions.data = location.origin
    qrCodeOptions.image = logo

    qrCode.append(qrCodeImg.value)
    qrCode.update(qrCodeOptions)
  }

  function initHammer() {
    const manager = new Hammer.Manager(qrCodeImg.value)
    const Press = new Hammer.Press({
      time: 500
    })
    manager.add(Press)
    manager.on('press', function () {
      showActionSheet.value = true
    })
  }

  onMounted(() => {
    initQrCode()
    initHammer()
  })

  const showActionSheet = ref(false)
  const actionSheetOptions = [{ name: '保存到本地' }]
  function onSelectAction(action, index) {
    console.log(action, index)
    switch (index) {
      case 0:
        /**
         * @todo
         */
        // qrCode.getRawData('png').then((buffer) => {

        // })
        break

      default:
        break
    }
  }
</script>

<style lang="scss" scoped>
  .system_code {
    width: 100%;
    height: 100%;
    padding: 72px 14px;
    overflow: auto;
    background: url('@/assets/images/index/bg1.png') no-repeat right 0 bottom 55px,
      url('@/assets/images/index/bg2.png') no-repeat 0 44px;
    &_panel {
      width: 347px;
      height: 379px;
      background: #ffffff;
      box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &-img {
        width: 220px;
        height: 224px;
        margin-bottom: 26px;
        #qrCode {
          width: 100%;
          height: 100%;
        }
      }
      &-tip {
        color: #373737;
        font-size: 14px;
      }
    }
  }
</style>
