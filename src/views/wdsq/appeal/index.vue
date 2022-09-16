<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-col">
    <nav-bar title="在线诉求反映"></nav-bar>
    <div class="tw-flex-1 appeal">
      <p class="appeal_title">事项内容</p>
      <van-form
        :readonly="readonly"
        class="custom_van_form"
        @submit="onSubmit">
        <van-field
          v-model="formData.title"
          label="诉求对象名称"
          name="title"
          :rules="rules.title"
          :placeholder="readonly ? '' : '请输入诉求对象名称'">
        </van-field>

        <van-field
          :model-value="streetCasText"
          label="诉求对象地址"
          name="streetCasText"
          :rules="rules.streetCasText"
          :is-link="!readonly"
          :readonly="true"
          :placeholder="readonly ? '' : '点击选择'"
          @click="onSelectStreet">
        </van-field>
        <van-popup
          v-model:show="showStreetPicker"
          position="bottom">
          <van-cascader
            v-model="formData.areaCode"
            :options="streetCasOptions"
            :field-names="streetFiledNames"
            active-color="#3189FF"
            :show-header="false"
            @finish="onStreetCasFinish">
          </van-cascader>
        </van-popup>

        <van-field
          v-model="formData.address"
          label=""
          name="address"
          :rules="rules.address"
          type="textarea"
          maxlength="100"
          :placeholder="readonly ? '' : '请输入详细地址'"
          rows="3"
          :border="false"
          :autosize="false"
          :show-word-limit="false">
        </van-field>

        <van-field
          :model-value="typeCasText"
          label="诉求类型"
          name="typeCasText"
          :rules="rules.typeCasText"
          :is-link="!readonly"
          :readonly="true"
          :placeholder="readonly ? '' : '点击选择'"
          @click="onSelectType">
        </van-field>
        <van-popup
          v-model:show="showTypePicker"
          position="bottom">
          <van-cascader
            v-model="formData.appealType"
            :options="typeCasOptions"
            :field-names="typeFiledNames"
            active-color="#3189FF"
            :show-header="false"
            @finish="onTypeCasFinish">
          </van-cascader>
        </van-popup>

        <p class="tw-text-[16px] tw-text-[#666666] tw-font-semibold tw-mt-[22px] tw-mb-[2px]">
          诉求描述
        </p>
        <van-field
          v-model="formData.description"
          label=""
          name="description"
          :rules="rules.description"
          type="textarea"
          maxlength="100"
          :placeholder="readonly ? '' : '请输入详细诉求描述'"
          rows="6"
          :border="true"
          :autosize="false"
          :show-word-limit="false">
        </van-field>

        <p class="tw-text-[16px] tw-text-[#666666] tw-font-semibold tw-mt-[22px]">附件说明</p>
        <upload-file
          v-model="formData.filePath"
          :readonly="readonly">
        </upload-file>

        <div
          v-if="!readonly"
          class="tw-mt-[30px]">
          <van-button
            type="primary"
            color="#3189FF"
            block
            native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>

      <template v-if="readonly && formData.processStatus === 2">
        <p class="tw-text-[16px] tw-text-[#666666] tw-font-semibold tw-mt-[22px] tw-mb-[12px]">
          办理结果
        </p>
        <div class="tw-flex tw-h-[94px] tw-bg-[#E5EFFB] tw-rounded-[6px] tw-p-[14px]">
          <img
            class="tw-w-[18px] tw-h-[18px] tw-mt-[5px] tw-mr-[8px]"
            src="@/assets/images/jzxx/icon_handle.png"
            alt="" />
          <p class="tw-flex-1 tw-font-medium tw-text-[15px] tw-text-[#5591E0]">
            您反映的问题，责任单位已处理。责任单位将通过您所留的方式答复结果，感谢您对我们工作的理解与支持！
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import UploadFile from '@/components/upload-file.vue'
  import {
    userObjName,
    userObjAddress,
    userObjMessageAddress,
    userObjType,
    userObjChinese
  } from '@/configs/globalvar'
  import { createAppeal, getAppealDetail, getAppealType, getStreet } from '@/api'
  import { Toast } from 'vant'

  const route = useRoute()
  const router = useRouter()
  console.log(route.params.mode)
  /**
   * 创建 、详情
   */
  const readonly = computed(() => route.params.mode !== 'create')

  onMounted(() => {
    getStreetCasOptions()
    getTypeCasOptions()

    if (readonly.value) {
      const id = route.params.id
      getDetail(id)
    }
  })

  /**
   * 表单数据
   */
  const formData = reactive({
    title: '',
    areaCode: '',
    address: '',
    appealType: '',
    description: '',
    filePath: [],
    orderType: 1,
    processStatus: 1
  })

  const rules = reactive({
    title: userObjName,
    streetCasText: userObjAddress,
    address: userObjMessageAddress,
    typeCasText: userObjType,
    description: userObjChinese
  })

  /**
   * 选择器字段对应
   */
  const streetFiledNames = {
    text: 'name',
    value: 'name',
    children: 'streets'
  }
  // 地址选择
  /**
   * 控制地址选择显示
   */
  const showStreetPicker = ref(false)
  /**
   * 点击地址选择
   */
  function onSelectStreet() {
    if (readonly.value) {
      return
    }
    showStreetPicker.value = true
  }
  /**
   * 地址选择选项
   */
  const streetCasOptions = ref([])
  function getStreetCasOptions() {
    getStreet()
      .then((res) => {
        if (res.data.code === 0) {
          streetCasOptions.value = res.data.data.map((item, code) => {
            return {
              ...item,
              code
            }
          })
        } else {
          Toast(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  /**
   * 地址显示文字
   */
  const streetCasText = computed(() => {
    let district = ''
    let street = ''

    for (let i = 0; i < streetCasOptions.value.length; i++) {
      const item = streetCasOptions.value[i]
      for (let j = 0; j < item.streets.length; j++) {
        if (item.streets[j].name === formData.areaCode) {
          district = item.name
          street = item.streets[j].name
          break
        }
      }
      if (district && street) {
        break
      }
    }

    return formData.areaCode ? `${district} ${street}` : ''
  })
  /**
   * 赋值区，街道
   */
  // eslint-disable-next-line no-unused-vars
  function onStreetCasFinish({ selectedOptions }) {
    showStreetPicker.value = false
  }

  /**
   * 选择器字段对应
   */
  const typeFiledNames = {
    text: 'label',
    value: 'index'
  }
  // 类型选择
  /**
   * 控制类型选择显示
   */
  const showTypePicker = ref(false)
  /**
   * 点击类型选择
   */
  function onSelectType() {
    if (readonly.value) {
      return
    }
    showTypePicker.value = true
  }
  /**
   * 类型选择选项
   */
  const typeCasOptions = ref([])
  function getTypeCasOptions() {
    getAppealType()
      .then((res) => {
        if (res.data.code === 0) {
          typeCasOptions.value = res.data.data
        } else {
          Toast(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  /**
   * 类型显示文字
   */
  const typeCasText = computed(() => {
    const result = typeCasOptions.value.find((item) => {
      return item.index === formData.appealType
    })

    return result ? result.label : ''
  })

  // eslint-disable-next-line no-unused-vars
  function onTypeCasFinish({ selectedOptions }) {
    showTypePicker.value = false
  }

  function onSubmit(values) {
    console.log(values)
    createAppeal({
      ...formData,
      appealType: JSON.stringify(formData.appealType),
      filePath: JSON.stringify(formData.filePath)
    })
      .then((res) => {
        if (res.data.code === 0) {
          Toast('提交成功，感谢您对我们工作的支持！')
          router.push('/')
        } else {
          Toast(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function getDetail(id) {
    getAppealDetail(id)
      .then((res) => {
        if (res.data.code === 0) {
          for (const key in formData) {
            if (Object.hasOwnProperty.call(formData, key)) {
              if (key === 'filePath') {
                formData[key] = JSON.parse(res.data.data[key])
              } else if (key === 'appealType') {
                formData[key] = Number(res.data.data[key])
              } else {
                formData[key] = res.data.data[key]
              }
            }
          }
        } else {
          Toast(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
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
      margin-bottom: 14px;
    }
  }
</style>
