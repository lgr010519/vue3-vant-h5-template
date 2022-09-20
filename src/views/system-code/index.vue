<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-col">
    <nav-bar title="系统二维码"></nav-bar>
    <div class="system_code tw-flex-1">
      <div class="system_code_panel">
        <div
          class="system_code_panel-img"
          @click="onClick">
          <div
            ref="qrCodeCanvas"
            class="tw-w-full tw-h-full">
          </div>
          <img
            ref="qrCodeImg"
            class="tw-absolute tw-inset-0"
            :src="imgSrc"
            alt="" />
        </div>
        <p class="system_code_panel-tip">点击二维码保存到本地</p>
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
  // import Hammer from 'hammerjs'
  import { saveAs } from 'file-saver'

  const qrCode = new QRCodeStyling(qrCodeOptions)
  const qrCodeCanvas = ref(null)

  const qrCodeImg = ref(null)
  const imgSrc = ref('')
  function initQrCode() {
    qrCodeOptions.width = qrCodeCanvas.value.offsetWidth
    qrCodeOptions.height = qrCodeCanvas.value.offsetHeight
    qrCodeOptions.data = location.origin + '/'
    qrCodeOptions.image = logo

    qrCode.append(qrCodeCanvas.value)
    qrCode.update(qrCodeOptions)

    qrCode.getRawData().then((buffer) => {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        imgSrc.value = e.target.result
      }

      fileReader.readAsDataURL(buffer)
    })
  }

  // function initHammer() {
  //   const manager = new Hammer.Manager(qrCodeImg.value)
  //   const Press = new Hammer.Press({
  //     time: 500
  //   })
  //   manager.add(Press)
  //   manager.on('press', function () {
  //     showActionSheet.value = true
  //   })
  // }

  onMounted(() => {
    initQrCode()
    // initHammer()
  })

  function onClick() {
    showActionSheet.value = true
  }

  const showActionSheet = ref(false)
  const actionSheetOptions = [{ name: '保存到本地' }]
  function onSelectAction(action, index) {
    switch (index) {
      case 0:
        qrCode.getRawData().then((buffer) => {
          saveAs(buffer, '系统二维码.png')
        })
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
        position: relative;
        width: 220px;
        height: 224px;
        margin-bottom: 26px;
      }
      &-tip {
        color: #373737;
        font-size: 14px;
      }
    }
  }
</style>
