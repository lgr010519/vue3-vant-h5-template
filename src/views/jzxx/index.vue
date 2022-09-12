<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col">
    <nav-bar title="局长信箱"></nav-bar>
    <div
      class="tw-mx-auto tw-pt-[24px] tw-w-[100%] tw-px-[14px] tw-pb-[14px] tw-flex-1 tw-overflow-auto">
      <!-- 事项内容 -->
      <div
        class="tw-text-[17px] tw-text-[#4A4A4A] tw-font-semibold tw-w-[100%] tw-h-[24px] tw-text-left tw-leading-[17px]">
        <span>事项内容</span>
      </div>
      <!-- form表单 -->
      <van-form
        class="custom_van_form"
        :readonly="!isCreate"
        @submit="onSubmit"
        label-align="left">
        <van-field
          v-model="form.appealTitle"
          name="用户名"
          label="诉求对象名称"
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
          @click="show = true"></van-field>
        <van-popup
          v-if="isCreate"
          v-model:show="show"
          round
          position="bottom">
          <van-cascader
            v-model="cascaderValue"
            title="请选择所在地区"
            :options="options"
            :field-names="streesNames"
            active-color="#3189FF"
            @close="show = false"
            @finish="onFinish" />
        </van-popup>
        <!-- 详细地址 -->
        <van-field
          v-model="form.appealAddress"
          rows="3"
          autosize
          label=""
          type="textarea"
          placeholder="请输入详细地址"
          show-word-limit>
        </van-field>
        <!-- 诉求类型 -->
        <van-field
          style="padding: 0; height: 30px; margin-top: 15px"
          v-model="form.appealType"
          :is-link="isCreate"
          readonly
          label="诉求类型"
          placeholder="请选择所在地区"
          @click="showType = true" />
        <van-popup
          v-if="isCreate"
          v-model:show="showType"
          round
          position="bottom">
          <van-cascader
            v-model="typeValue"
            title="请选择诉求类型"
            active-color="#3189FF"
            :field-names="fieldNames"
            :options="TypeList"
            @close="showType = false"
            @finish="typeFinish" />
        </van-popup>
        <!-- 诉求描述 -->
        <div class="tw-mt-[22px] tw-text-[16px] tw-font-semibold tw-text-[#666666]">
          <span>诉求描述</span>
        </div>
        <div>
          <van-field
            v-model="form.appealDescription"
            rows="4"
            autosize
            label=""
            type="textarea"
            show-word-limit>
          </van-field>
        </div>
        <div class="tw-mt-[22px] tw-text-[16px] tw-font-semibold tw-text-[#666666]">
          <span>附件说明</span>
        </div>
        <upload-file
          :readonly="!isCreate"
          v-model="form.attachments"></upload-file>
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
      <div v-if="!isCreate">
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
  import { useRoute } from 'vue-router'
  import { getAppealType, getStreet, addNewPetition } from '@/api/index'
  import { Toast } from 'vant'
  const route = useRoute()
  const show = ref(false)
  const form = reactive({
    // 对象名称
    appealTitle: '',
    // 诉求类型
    appealType: '',
    // 区级地址
    district: '',
    // 街道地址
    appealAreaCode: '',
    // 区域地址
    spaceValue: '',
    // 详细地址
    appealAddress: '',
    // 诉求描述
    appealDescription: ''
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
    console.log(selectedOptions)
    show.value = false
    console.log(selectedOptions)
    if (selectedOptions[0].name) {
      form.district = selectedOptions[0].name
    }
    if (selectedOptions[1].code) {
      form.appealAreaCode = selectedOptions[1].code
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
    form.appealType = selectedOptions.map((option) => option.label).join('/')
  }
  //获取诉求类型
  const getAppeal = async () => {
    const result = await getAppealType()
    if (result.data.data) {
      TypeList.value = result.data.data
    } else {
      Toast('获取诉求类型失败')
    }
  }
  //获取街道类型
  const getstreet = async () => {
    const result = await getStreet()
    if (result.data.code == 0) {
      options.value = result.data.data
    } else {
      Toast(result.data.msg)
    }
  }

  onMounted(() => {
    getAppeal()
    getstreet()
    // if (route.params.mode === 'detail') {
    //   form.spaceValue = '湖北省' + ' ' + '武汉市'
    //   form.talkType = '废气'
    //   form.message = '中秋节居然还要加班'
    // }
  })

  // 判断当前页面的展示状态
  const isCreate = computed(() => {
    return route.params.mode === 'create'
  })
  //提交表单
  const onSubmit = async () => {
    const result = await addNewPetition(form)
    console.log(result)
  }
</script>

<style lang="scss" scoped>
  .custom_van_form {
    @extend .custom_van_form;
  }
</style>
