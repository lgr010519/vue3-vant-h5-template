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
          :placeholder="readonly ? '' : '请输入诉求对象名称'"
          :rules="rules.reflectionTitle">
        </van-field>

        <van-field
          :model-value="streetCasText"
          :is-link="!readonly"
          :readonly="true"
          label="诉求对象地址"
          name="streetCasText"
          :placeholder="readonly ? '' : '点击选择'"
          @click="onSelectStreet"
          :rules="rules.streetCasText">
        </van-field>
        <van-popup
          v-model:show="showStreetPicker"
          position="bottom">
          <van-cascader
            v-model="formData.reflectionAreaCode"
            :options="streetCasOptions"
            :field-names="filedNames"
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
          :is-link="!readonly"
          :readonly="true"
          label="诉求类型"
          name="typeCasText"
          :rules="rules.typeCasText"
          :placeholder="readonly ? '' : '点击选择'"
          @click="onSelectType">
        </van-field>
        <van-popup
          v-model:show="showTypePicker"
          position="bottom">
          <van-cascader
            v-model="formData.reflectionType"
            :options="typeCasOptions"
            :field-names="filedNames"
            active-color="#3189FF"
            :show-header="false"
            @close="onTypeCasClose"
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
        <van-field
          name="reflectionFilePath"
          :rules="rules.reflectionFilePath">
          <template #input>
            <upload-file
              v-model="formData.reflectionFilePath"
              :readonly="readonly">
            </upload-file>
          </template>
        </van-field>

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
  import { computed, reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import UploadFile from '@/components/upload-file.vue'

  const route = useRoute()
  console.log(route.params.mode)
  /**
   * 创建 、详情
   */
  const readonly = computed(() => route.params.mode !== 'create')

  /**
   * 表单数据
   */
  const formData = reactive({
    reflectionTitle: '',
    district: '',
    reflectionAreaCode: '',
    reflectionAddress: '',
    reflectionType: '',
    reflectionDescription: '',
    reflectionFilePath: []
  })

  const rules = reactive({
    reflectionTitle: [{ require: true, message: '请输入诉求对象名称' }],
    streetCasText: []
  })

  /**
   * 选择器字段对应
   */
  const filedNames = {
    text: 'text',
    value: 'value',
    children: 'children'
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
  /**
   * 地址显示文字
   */
  const streetCasText = computed(() => {
    return formData.district && formData.reflectionAreaCode
      ? `${formData.district} ${formData.reflectionAreaCode}`
      : ''
  })
  /**
   * 赋值区，街道
   */
  function onStreetCasFinish({ selectedOptions }) {
    showStreetPicker.value = false
    console.log(selectedOptions)
    const [district, street] = selectedOptions.map((item) => {
      return item.text
    })

    formData.district = district
    formData.reflectionAreaCode = street
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
   * @todo 接口获取
   * 类型选择选项
   */
  const typeCasOptions = ref([
    { text: '噪声', value: '1' },
    { text: '废水', value: '2' },
    { text: '废气', value: '3' }
  ])
  /**
   * 类型显示文字
   */
  const typeCasText = computed(() => {
    const result = typeCasOptions.value.find((item) => {
      return item.value === formData.reflectionType
    })

    console.log(result)

    return result ? result.text : ''
  })
  /**
   * @todo 需要赋值吗？
   */
  function onTypeCasFinish({ selectedOptions }) {
    showTypePicker.value = false
    console.log(selectedOptions)
  }

  function onSubmit(values) {
    console.log(values)
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
