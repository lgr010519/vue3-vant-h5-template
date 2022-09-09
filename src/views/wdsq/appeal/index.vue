<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-col">
    <nav-bar title="在线诉求反映"></nav-bar>
    <div class="tw-flex-1 appeal">
      <p class="appeal_title">事项内容</p>
      <van-form class="custom_vant">
        <van-field
          v-model="formData.username"
          name="用户名"
          label="诉求对象名称"
          placeholder="请输入诉求对象名称"
          :rules="[{ required: true, message: '请填写用户名' }]">
        </van-field>
        <van-field
          v-model="formData.address"
          is-link
          readonly
          label="诉求对象地址"
          placeholder="点击选择"
          @click="onSelectAddress">
        </van-field>
        <van-popup
          v-model:show="showAddressPicker"
          position="bottom">
          <van-picker
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showAddressPicker = false">
          </van-picker>
        </van-popup>
        <van-field
          v-model="formData.addressInfo"
          label=""
          name=""
          type="textarea"
          maxlength="50"
          placeholder="请输入详细地址"
          rows="2"
          :autosize="false"
          :show-word-limit="false">
        </van-field>
        <van-field
          v-model="formData.type"
          is-link
          readonly
          label="诉求类型"
          placeholder="点击选择"
          @click="onSelectType">
        </van-field>
        <van-popup
          v-model:show="showTypePicker"
          position="bottom">
          <van-picker
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showTypePicker = false">
          </van-picker>
        </van-popup>
        <p class="tw-text-[16px] tw-text-[#666666] tw-font-semibold tw-mt-[22px] tw-mb-[12px]">
          诉求描述
        </p>
        <van-field
          v-model="formData.desc"
          label=""
          name=""
          type="textarea"
          maxlength="50"
          placeholder="请输入详细地址"
          rows="4"
          :autosize="false"
          :show-word-limit="false">
        </van-field>
        <p class="tw-text-[16px] tw-text-[#666666] tw-font-semibold tw-mt-[22px] tw-mb-[12px]">
          附件说明
        </p>
      </van-form>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  console.log(route.params.mode)

  const formData = reactive({
    username: '',
    address: '',
    addressInfo: '',
    type: '',
    desc: ''
  })

  const showAddressPicker = ref(false)
  function onSelectAddress() {
    showAddressPicker.value = true
  }

  const showTypePicker = ref(false)
  function onSelectType() {
    showTypePicker.value = true
  }
</script>

<style lang="scss" scoped>
  .appeal {
    padding: 24px 14px;
    overflow: auto;
    &_title {
      color: #4a4a4a;
      font-size: 17px;
      font-weight: 700;
      margin-bottom: 24px;
    }
  }
</style>

<style lang="scss">
  .custom_vant {
    --van-field-label-color: #666666 !important;
  }
</style>
