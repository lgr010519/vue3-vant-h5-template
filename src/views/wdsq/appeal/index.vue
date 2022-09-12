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
          v-model="formData.reflectionTitle"
          label="诉求对象名称"
          name="reflectionTitle"
          :rules="rules.reflectionTitle"
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
            v-model="formData.reflectionAreaCode"
            :options="streetCasOptions"
            :field-names="streetFiledNames"
            active-color="#3189FF"
            :show-header="false"
            @finish="onStreetCasFinish">
          </van-cascader>
        </van-popup>

        <van-field
          v-model="formData.reflectionAddress"
          label=""
          name="reflectionAddress"
          :rules="rules.reflectionAddress"
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
            v-model="formData.reflectionType"
            :options="typeCasOptions"
            :field-names="typeFiledNames"
            active-color="#3189FF"
            :show-header="false"
            @finish="onTypeCasFinish">
          </van-cascader>
        </van-popup>

        <p class="tw-text-[16px] tw-text-[#666666] tw-font-semibold tw-mt-[22px] tw-mb-[12px]">
          诉求描述
        </p>
        <van-field
          v-model="formData.reflectionDescription"
          label=""
          name="reflectionDescription"
          :rules="rules.reflectionDescription"
          type="textarea"
          maxlength="100"
          :placeholder="readonly ? '' : '请输入详细诉求描述'"
          rows="6"
          :border="false"
          :autosize="false"
          :show-word-limit="false">
        </van-field>

        <p class="tw-text-[16px] tw-text-[#666666] tw-font-semibold tw-mt-[22px]">附件说明</p>
        <upload-file
          v-model="formData.reflectionFilePath"
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
  import { addNewAppeal, getAppealType, getStreet } from '@/api'
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
  })

  /**
   * 表单数据
   */
  const formData = reactive({
    reflectionTitle: '',
    reflectionAreaCode: '',
    reflectionAddress: '',
    reflectionType: '',
    reflectionDescription: '',
    reflectionFilePath: []
  })

  const rules = reactive({
    reflectionTitle: userObjName,
    streetCasText: userObjAddress,
    reflectionAddress: userObjMessageAddress,
    typeCasText: userObjType,
    reflectionDescription: userObjChinese
  })

  /**
   * 选择器字段对应
   */
  const streetFiledNames = {
    text: 'name',
    value: 'code',
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
        if (item.streets[j].code === formData.reflectionAreaCode) {
          district = item.name
          street = item.streets[j].name
          break
        }
      }
      if (district && street) {
        break
      }
    }

    return formData.reflectionAreaCode ? `${district} ${street}` : ''
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
      return item.index === formData.reflectionType
    })

    return result ? result.label : ''
  })

  // eslint-disable-next-line no-unused-vars
  function onTypeCasFinish({ selectedOptions }) {
    showTypePicker.value = false
  }

  function onSubmit(values) {
    console.log(values)
    addNewAppeal({
      ...formData,
      reflectionType: JSON.stringify(formData.reflectionType),
      reflectionFilePath: JSON.stringify(formData.reflectionFilePath)
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
