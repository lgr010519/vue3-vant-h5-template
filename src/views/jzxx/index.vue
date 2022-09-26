<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col">
    <nav-bar title="局长信箱"></nav-bar>
    <div
      class="tw-mx-auto tw-pt-[24px] tw-w-[100%] tw-px-[14px] tw-pb-[14px] tw-flex-1 tw-overflow-auto">
      <!-- 事项内容 -->
      <p
        class="tw-text-[17px] tw-text-[#4A4A4A] tw-font-semibold tw-w-[100%] tw-h-[24px] tw-text-left tw-leading-[17px]">
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
      <div v-if="!isCreate && form.processStatus != 1">
        <p class="tw-text-[16px] tw-font-semibold tw-text-[#666666]">办理结果</p>
        <div
          class="tw-w-[100%] tw-mt-[12px] tw-flex tw-items-center tw-h-[94px] tw-bg-[#E5EFFB] tw-rounded-[6px]">
          <div class="tw-mx-auto tw-flex tw-justify-between tw-w-[329px] tw-h-[66px]">
            <div class="tw-w-[18px] tw-h-[18px] tw-mt-[2px]">
              <img
                style="width: 100%; height: 100%"
                src="@/assets/images/jzxx/icon_handle.png"
                alt="" />
            </div>
            <div class="tw-w-[293px] tw-h-[100%] tw-font-medium tw-text-[15px] tw-text-[#5591E0]">
              <p>
                您反映的问题，责任单位已处理。责任单位将通过您所留的方式答复结果，感谢您对我们工作的理解与支持！
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
  import { getAppealType, getStreet, createAppeal, getAppealDetail } from '@/api/index'
  import { Toast } from 'vant'
  import {
    userObjName,
    userObjAddress,
    userObjMessageAddress,
    userObjType,
    userObjChinese
  } from '@/configs/globalvar'
  const route = useRoute()
  const router = useRouter()
  const show = ref(false)
  const form = reactive({
    //局长信箱默认类型
    orderType: 3,
    // 对象名称
    title: '',
    // 诉求类型
    appealType: '',
    // 区级地址
    district: '',
    // 街道地址
    areaCode: '',
    // 区域地址
    spaceValue: '',
    // 详细地址
    address: '',
    // 诉求描述
    description: '',
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
    if (selectedOptions[0].name) {
      form.district = selectedOptions[0].name
    }
    if (selectedOptions[1].code) {
      form.areaCode = selectedOptions[1].name
    }
    form.spaceValue = selectedOptions.map((option) => option.name).join(' ')
  }
  // 是否诉求菜单
  const showType = ref(false)
  //诉求类型详情
  const typeValue = ref('')
  //诉求列表
  const TypeList = ref([])
  // 诉求表单回调
  const typeFinish = ({ selectedOptions }) => {
    showType.value = false
    typeValue.value = selectedOptions.map((option) => option.label).join('/')
    form.appealType = selectedOptions.map((option) => option.index).join('/')
  }
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

  onMounted(() => {
    getAppeal()
    getstreet()
    if (route.params.mode === 'detail') {
      getAppealDetail(route.params.id)
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
              area
            } = res.data.data
            form.address = address
            form.title = title
            form.areaCode = areaCode
            form.area = area
            form.description = description
            form.filePath = JSON.parse(filePath)
            form.orderType = orderType
            typeValue.value = getOrderType(orderType)
            form.spaceValue = streetCasText
            form.processStatus = processStatus
          } else {
            Toast(res.data.msg)
          }
        })
        .catch(() => {
          Toast('服务器出错,获取详情失败')
        })
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
    submitForm()
  }
</script>

<style lang="scss" scoped>
  .custom_van_form {
    @extend .custom_van_form;
  }
</style>
