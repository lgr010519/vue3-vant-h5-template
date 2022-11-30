<template>
  <div class="tw-flex tw-h-full tw-w-full tw-flex-col">
    <nav-bar title="在线诉求反映"></nav-bar>
    <div class="appeal tw-flex-1">
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
            v-model="formData.area"
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

        <div
          v-if="readonly || Number.isInteger(rangeNumber)"
          class="tw-flex tw-justify-between">
          <p class="tw-mt-[22px] tw-mb-[2px] tw-text-[16px] tw-font-semibold tw-text-[#666666]">
            诉求范围
          </p>
          <div class="appealRange tw-mt-[20px] tw-h-[64px] tw-w-[235px] tw-pb-[10px]">
            {{ appealRange }}
          </div>
        </div>

        <!-- 行业类型 -->
        <van-field
          v-model="industryValue"
          :is-link="!readonly"
          label="行业类型"
          :placeholder="readonly ? '' : '点击选择'"
          :rules="rules.industry"
          @click="onSelectIndustry">
        </van-field>
        <van-popup
          v-model:show="industry"
          round
          position="bottom">
          <van-cascader
            v-model="formData.industryType"
            :closeable="false"
            :show-header="false"
            title="请选择诉求类型"
            active-color="#3189FF"
            :options="industryList"
            @close="industry = false"
            @finish="industryFinish">
          </van-cascader>
        </van-popup>

        <p class="tw-mt-[22px] tw-mb-[2px] tw-text-[16px] tw-font-semibold tw-text-[#666666]">
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

        <p class="tw-mt-[22px] tw-text-[16px] tw-font-semibold tw-text-[#666666]">附件说明</p>
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

      <template v-if="readonly && formData.processStatus === 3">
        <p class="tw-mt-[22px] tw-mb-[12px] tw-text-[16px] tw-font-semibold tw-text-[#666666]">
          办理结果
        </p>
        <div class="tw-flex tw-h-[94px] tw-rounded-[6px] tw-bg-[#E5EFFB] tw-p-[14px]">
          <img
            class="tw-mt-[5px] tw-mr-[8px] tw-h-[18px] tw-w-[18px]"
            src="@/assets/images/jzxx/icon_handle.png"
            alt="" />
          <p class="tw-flex-1 tw-text-[15px] tw-font-medium tw-text-[#5591E0]">
            您反映的问题，责任单位已处理，处理结果将通过电话、短信等方式及时向您反馈，感谢您对我们工作的理解和支持！
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
    userObjChinese,
    userObjIndustry
  } from '@/configs/globalvar'
  import { createAppeal, getAppealDetail, getAppealType, getStreet } from '@/apis'
  import { Toast, Dialog } from 'vant'

  const route = useRoute()
  const router = useRouter()
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
    area: '',
    address: '',
    appealType: '',
    description: '',
    filePath: [],
    orderType: 1,
    processStatus: 1,
    industryType: ''
  })

  const rules = reactive({
    title: userObjName,
    streetCasText: userObjAddress,
    address: userObjMessageAddress,
    typeCasText: userObjType,
    description: userObjChinese,
    industry: userObjIndustry
  })

  //诉求范围展示
  const rangeText = reactive([
    '生态环境部门主要负责对工业噪声、建筑施工噪声以及商业经营活动、营业性文化娱乐活动中使用设备、设施产生的社会生活噪声实施监管。',
    '生态环境部门主要负责对工业企业、餐饮服务单位和其他生产经营者在生产经营活动中产生的废气、油烟污染实施监管。',
    '生态环境部门主要负责对工业企业在生产经营过程中产生的废水污染实施监管。',
    '生态环境部门主要负责对工业固体废弃物、危险废物污染实施监管。',
    '生态环境部门主要负责电磁辐射、核辐射、建筑工地光污染、机动车排放黑烟等实施监管以及承担建设项目环评审批、排污许可、碳排放交易等业务管理工作。'
  ])
  const rangeNumber = ref('')
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
        if (item.streets[j].name === formData.area) {
          district = item.name
          street = item.streets[j].name
          break
        }
      }
      if (district && street) {
        break
      }
    }

    return formData.area ? `${district} ${street}` : ''
  })
  /**
   * 赋值区，街道
   */
  // eslint-disable-next-line no-unused-vars
  function onStreetCasFinish({ selectedOptions }) {
    formData.areaCode = selectedOptions[1].code
    formData.area = selectedOptions[1].name
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
  const appealRange = computed(() => {
    return rangeText[rangeNumber.value]
  })
  // eslint-disable-next-line no-unused-vars
  function onTypeCasFinish({ value }) {
    rangeNumber.value = value
    console.log(appealRange.value)
    showTypePicker.value = false
  }

  function onSubmit() {
    Dialog.confirm({
      message: `您反映的是位于${streetCasText.value.slice(0, 3)}的${
        formData.title
      }问题，建议阅知生态环境部门受理事项范围，如不属于生态环境部门职责事项，可另行拔打深圳便民热线12345反映。是否继续提交诉求(是、否)`,
      confirmButtonColor: '#337ECC',
      confirmButtonText: '是',
      cancelButtonText: '否',
      messageAlign: 'left'
    })
      .then(() => {
        // on confirm
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
      })
      .catch(() => {
        // on cancel
        console.log('取消')
      })
  }

  function getDetail(id) {
    getAppealDetail(id)
      .then((res) => {
        if (res.data.code === 0) {
          rangeNumber.value = res.data.data.appealType
          industryValue.value = res.data.data.industryType
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

  const industryValue = ref('')
  const industry = ref(false)
  // 行业列表
  const industryList = ref([
    {
      text: '建筑施工类',
      value: '建筑施工类'
    },
    {
      text: '工业类',
      value: '工业类'
    },
    {
      text: '三产类（餐饮、文化娱乐、汽修等营业性活动类）',
      value: '三产类（餐饮、文化娱乐、汽修等营业性活动类）'
    },
    {
      text: '其他类',
      value: '其他类'
    }
  ])
  // 行业类型回调
  const industryFinish = ({ selectedOptions }) => {
    industry.value = false
    industryValue.value = selectedOptions.map((option) => option.text).join('/')
    formData.industryType = selectedOptions.map((option) => option.value).join('/')
  }
  function onSelectIndustry() {
    if (readonly.value) {
      return
    }
    industry.value = true
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
    .appealRange {
      color: #337ecc;
      font-weight: 400;
      font-size: 12px;
    }
  }
</style>
