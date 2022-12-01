<template>
  <div class="tw-flex tw-h-[100%] tw-w-[100%] tw-flex-col">
    <nav-bar title="局长信箱"></nav-bar>
    <div
      class="tw-mx-auto tw-w-[100%] tw-flex-1 tw-overflow-auto tw-px-[14px] tw-pt-[24px] tw-pb-[14px]">
      <!-- 事项内容 -->
      <p
        class="tw-h-[24px] tw-w-[100%] tw-text-left tw-text-[17px] tw-font-semibold tw-leading-[17px] tw-text-[#4A4A4A]">
        事项内容
      </p>
      <!-- form表单 -->
      <van-form
        class="custom_van_form tw-pt-[14px]"
        :readonly="!isCreate"
        label-align="left"
        @submit="onSubmit">
        <van-field
          v-model="form.title"
          name="用户名"
          label="诉求对象名称"
          :rules="userObjName"
          placeholder="请输入名称">
        </van-field>
        <!-- 选择区域 -->
        <van-field
          v-model="form.spaceValue"
          :is-link="isCreate"
          readonly
          label="诉求对象地址"
          placeholder="点击选择"
          value="hahaha"
          :rules="userObjAddress"
          @click="show = true">
        </van-field>
        <van-popup
          v-if="isCreate"
          v-model:show="show"
          round
          position="bottom">
          <van-cascader
            v-model="cascaderValue"
            :closeable="false"
            :show-header="false"
            title="请选择所在地区"
            :options="options"
            :field-names="streesNames"
            active-color="#3189FF"
            @close="show = false"
            @finish="onFinish">
          </van-cascader>
        </van-popup>
        <!-- 详细地址 -->
        <van-field
          v-model="form.address"
          rows="3"
          autosize
          label=""
          type="textarea"
          :rules="userObjMessageAddress"
          placeholder="请输入详细地址"
          show-word-limit>
        </van-field>
        <!-- 诉求类型 -->
        <van-field
          v-model="typeValue"
          :is-link="isCreate"
          label="诉求类型"
          placeholder="点击选择"
          :rules="userObjType"
          @click="showType = true">
        </van-field>
        <van-popup
          v-if="isCreate"
          v-model:show="showType"
          round
          position="bottom">
          <van-cascader
            v-model="form.appealType"
            :closeable="false"
            :show-header="false"
            title="请选择诉求类型"
            active-color="#3189FF"
            :field-names="fieldNames"
            :options="TypeList"
            @close="showType = false"
            @finish="typeFinish">
          </van-cascader>
        </van-popup>
        <div
          v-if="Number.isInteger(rangeNumber) || !isCreate"
          class="tw-flex tw-justify-between">
          <p class="tw-mt-[22px] tw-mb-[2px] tw-text-[16px] tw-font-semibold tw-text-[#666666]">
            诉求范围
          </p>
          <div class="appealRange tw-mt-[20px] tw-w-[235px] tw-pb-[10px]">
            {{ appealRange }}
          </div>
        </div>
        <!-- 行业类型 -->
        <van-field
          v-model="industryValue"
          :is-link="isCreate"
          label="行业类型"
          placeholder="点击选择"
          :rules="userObjIndustry"
          @click="industry = true">
        </van-field>
        <van-popup
          v-if="isCreate"
          v-model:show="industry"
          round
          position="bottom">
          <van-cascader
            v-model="form.industryType"
            :closeable="false"
            :show-header="false"
            title="请选择诉求类型"
            active-color="#3189FF"
            :options="industryList"
            @close="industry = false"
            @finish="industryFinish">
          </van-cascader>
        </van-popup>

        <!-- 诉求描述 -->
        <p class="tw-mt-[22px] tw-text-[16px] tw-font-semibold tw-text-[#666666]">诉求描述</p>
        <van-field
          v-model="form.description"
          rows="4"
          autosize
          label=""
          :rules="userObjChinese"
          type="textarea"
          show-word-limit>
        </van-field>

        <p class="tw-mt-[22px] tw-text-[16px] tw-font-semibold tw-text-[#666666]">附件说明</p>
        <upload-file
          v-model="form.filePath"
          :readonly="!isCreate">
        </upload-file>

        <div v-if="isCreate">
          <van-button
            color="#3189FF"
            block
            type="primary"
            native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
      <!-- 办理结果 -->
      <div v-if="!isCreate && form.processStatus === 3">
        <p class="tw-text-[16px] tw-font-semibold tw-text-[#666666]">办理结果</p>
        <div
          class="tw-mt-[12px] tw-flex tw-h-[94px] tw-w-[100%] tw-items-center tw-rounded-[6px] tw-bg-[#E5EFFB]">
          <div class="tw-mx-auto tw-flex tw-h-[66px] tw-w-[329px] tw-justify-between">
            <div class="tw-mt-[2px] tw-h-[18px] tw-w-[18px]">
              <img
                style="width: 100%; height: 100%"
                src="@/assets/images/jzxx/icon_handle.png"
                alt="" />
            </div>
            <div class="tw-h-[100%] tw-w-[293px] tw-text-[15px] tw-font-medium tw-text-[#5591E0]">
              <p>
                您反映的问题，责任单位已处理，处理结果将通过电话、短信等方式及时向您反馈，感谢您对我们工作的理解和支持！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import navBar from '@/components/nav-bar.vue'
  import { computed, onMounted, reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { getAppealType, getStreet, createAppeal, getAppealDetail } from '@/apis/index'
  import { Toast, Dialog } from 'vant'
  import {
    userObjName,
    userObjAddress,
    userObjMessageAddress,
    userObjType,
    userObjChinese,
    userObjIndustry
  } from '@/configs/globalvar'
  const route = useRoute()
  const router = useRouter()
  const show = ref(false)
  const industry = ref(false)
  const form = reactive({
    //局长信箱默认类型
    orderType: 3,
    // 对象名称
    title: '',
    // 诉求类型
    appealType: '',
    area: '',
    // 街道地址
    areaCode: '',
    // 区域地址
    spaceValue: '',
    // 详细地址
    address: '',
    // 诉求描述
    description: '',
    // 行业类型
    industryType: '',
    filePath: []
  })
  const cascaderValue = ref('')
  //自定义字段名
  const fieldNames = {
    text: 'label',
    value: 'index',
    children: 'items'
  }
  const streesNames = {
    text: 'name',
    value: 'name',
    children: 'streets'
  }
  const options = ref([])
  const onFinish = ({ selectedOptions }) => {
    show.value = false
    if (selectedOptions[1].name) {
      form.area = selectedOptions[1].name
    }
    if (selectedOptions[1].code) {
      form.areaCode = selectedOptions[1].code
    }
    form.spaceValue = selectedOptions.map((option) => option.name).join(' ')
  }
  // 是否诉求菜单
  const showType = ref(false)
  //诉求类型详情
  const typeValue = ref('')
  //诉求列表
  const TypeList = ref([])
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
  const industryValue = ref('')
  // 诉求表单回调
  const typeFinish = ({ selectedOptions, value }) => {
    rangeNumber.value = value
    showType.value = false
    typeValue.value = selectedOptions.map((option) => option.label).join('/')
    form.appealType = selectedOptions.map((option) => option.index).join('/')
  }
  // 行业类型回调
  const industryFinish = ({ selectedOptions }) => {
    industry.value = false
    industryValue.value = selectedOptions.map((option) => option.text).join('/')
    form.industryType = selectedOptions.map((option) => option.value).join('/')
  }
  //诉求范围展示
  const rangeText = reactive([
    '生态环境部门主要负责对工业噪声、建筑施工噪声以及商业经营活动、营业性文化娱乐活动中使用设备、设施产生的社会生活噪声实施监管。',
    '生态环境部门主要负责对工业企业、餐饮服务单位和其他生产经营者在生产经营活动中产生的废气、油烟污染实施监管。',
    '生态环境部门主要负责对工业企业在生产经营过程中产生的废水污染实施监管。',
    '生态环境部门主要负责对工业固体废弃物、危险废物污染实施监管。',
    '生态环境部门主要负责电磁辐射、核辐射、建筑工地光污染、机动车排放黑烟等实施监管以及承担建设项目环评审批、排污许可、碳排放交易等业务管理工作。'
  ])
  const rangeNumber = ref('')
  const appealRange = computed(() => {
    return rangeText[rangeNumber.value]
  })
  //获取诉求类型
  const getAppeal = async () => {
    try {
      const result = await getAppealType()
      if (result.data.code === 0) {
        TypeList.value = result.data.data
      } else {
        Toast('获取诉求类型失败')
      }
    } catch (e) {
      Toast('服务器出错,获取诉求类型失败')
    }
  }
  //获取街道类型
  const getstreet = async () => {
    try {
      const result = await getStreet()
      if (result.data.code == 0) {
        options.value = result.data.data
      } else {
        Toast(result.data.msg)
      }
    } catch (e) {
      Toast('服务器出错,获取街道信息失败')
    }
  }
  const getAppealDetails = (id) => {
    getAppealDetail(id)
      .then((res) => {
        if (res.data.code === 0) {
          const {
            title,
            areaCode,
            description,
            filePath,
            orderType,
            address,
            processStatus,
            area,
            appealType,
            industryType
          } = res.data.data
          form.address = address
          form.title = title
          form.areaCode = areaCode
          form.area = area
          form.description = description
          form.filePath = JSON.parse(filePath)
          form.orderType = orderType
          typeValue.value = getOrderType(appealType)
          form.spaceValue = streetCasText
          form.processStatus = processStatus
          form.industryType = industryType
          industryValue.value = industryType
          rangeNumber.value = appealType
        } else {
          Toast(res.data.msg)
        }
      })
      .catch(() => {
        Toast('服务器出错,获取详情失败')
      })
  }
  const getOrderType = (orderType) => {
    switch (orderType) {
      case 0:
        return '噪声'
      case 1:
        return '废气'
      case 2:
        return '废水'
      case 3:
        return '固废'
      case 4:
        return '其他'
    }
  }
  const streetCasText = computed(() => {
    let district = ''
    let street = ''

    for (let i = 0; i < options.value.length; i++) {
      const item = options.value[i]
      for (let j = 0; j < item.streets.length; j++) {
        if (item.streets[j].name === form.area) {
          district = item.name
          street = item.streets[j].name
          break
        }
      }
      if (district && street) {
        break
      }
    }

    return form.area ? `${district} ${street}` : ''
  })

  const region = computed(() => {
    let district = ''
    let street = ''

    for (let i = 0; i < options.value.length; i++) {
      const item = options.value[i]
      for (let j = 0; j < item.streets.length; j++) {
        if (item.streets[j].name === form.area) {
          district = item.name
          street = item.streets[j].name
          break
        }
      }
      if (district && street) {
        break
      }
    }

    return form.area ? `${district}` : ''
  })

  onMounted(() => {
    getAppeal()
    getstreet()
    if (route.params.mode === 'detail') {
      getAppealDetails(route.params.id)
    }
  })

  // 判断当前页面的展示状态
  const isCreate = computed(() => {
    return route.params.mode === 'create'
  })
  //提交表单
  const submitForm = () => {
    createAppeal({ ...form, filePath: JSON.stringify(form.filePath) })
      .then((res) => {
        if (res.data.code === 0) {
          Toast('提交成功，感谢您对我们工作的支持！')
          router.push('/index')
        } else {
          Toast(res.data.msg)
        }
      })
      .catch(() => {
        Toast('服务器出错,提交失败,请稍后尝试')
      })
      .finally(() => {
        router.push('/index')
      })
  }
  const onSubmit = () => {
    Dialog.confirm({
      message: `您反映的是位于${region.value}的${form.title}问题，建议阅知生态环境部门受理事项范围，如不属于生态环境部门职责事项，可另行拔打深圳便民热线12345反映。\n是否继续提交诉求(是、否)`,
      confirmButtonColor: '#337ECC',
      confirmButtonText: '是',
      cancelButtonText: '否'
      // messageAlign: 'left'
    })
      .then(() => {
        // on confirm
        submitForm()
      })
      .catch(() => {
        // on cancel
        console.log('取消')
      })
  }
</script>

<style lang="scss" scoped>
  .custom_van_form {
    @extend .custom_van_form;
  }
  .appealRange {
    color: #337ecc;
    font-weight: 400;
    font-size: 12px;
  }
</style>
