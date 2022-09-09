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
        @submit="onSubmit"
        label-align="left"
        style="padding: 0; margin-top: 24px">
        <van-cell-group
          style="margin: 0"
          inset>
          <van-field
            style="padding: 0; height: 30px"
            v-model="form.objName"
            name="用户名"
            label="诉求对象名称"
            placeholder="请输入名称">
          </van-field>
          <!-- 选择区域 -->
          <van-field
            style="padding: 0; height: 30px; margin-top: 15px"
            v-model="form.spaceValue"
            is-link
            readonly
            label="诉求对象地址"
            placeholder="点击选择"
            @click="show = true" />
          <van-popup
            v-model:show="show"
            round
            position="bottom">
            <van-cascader
              v-model="cascaderValue"
              title="请选择所在地区"
              :options="options"
              active-color="#3189FF"
              @close="show = false"
              @finish="onFinish" />
          </van-popup>
          <!-- 详细地址 -->
          <van-field
            style="padding: 0; border: 1px solid #e0e0e0; margin-top: 20px"
            v-model="form.address"
            rows="3"
            autosize
            label=""
            type="textarea"
            placeholder="请输入详细地址"
            show-word-limit>
          </van-field>
        </van-cell-group>
        <!-- 诉求类型 -->
        <van-field
          style="padding: 0; height: 30px; margin-top: 15px"
          v-model="form.talkType"
          is-link
          readonly
          label="诉求类型"
          placeholder="请选择所在地区"
          @click="showType = true" />
        <van-popup
          v-model:show="showType"
          round
          position="bottom">
          <van-cascader
            v-model="typeValue"
            title="请选择所在地区"
            active-color="#3189FF"
            :options="TypeList"
            @close="showType = false"
            @finish="typeFinish" />
        </van-popup>
        <!-- 诉求描述 -->
        <div class="tw-mt-[22px] tw-text-[14px] tw-text-[#666666]">
          <span>诉求描述</span>
        </div>
        <div>
          <van-field
            style="padding: 0; border: 1px solid #e0e0e0; margin-top: 12px"
            v-model="form.message"
            rows="4"
            autosize
            label=""
            type="textarea"
            show-word-limit>
          </van-field>
        </div>
        <div class="tw-mt-[22px] tw-text-[14px] tw-text-[#666666]">
          <span>附件说明</span>
        </div>
        <van-field
          name="uploadFile"
          style="padding: 0; margin-top: 12px"
          label="">
          <template #input>
            <van-uploader v-model="value" />
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button
            style="border-radius: 6px 6px 6px 6px"
            block
            type="primary"
            native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
  <h2>{{ spaceAndMessage }}</h2>
</template>

<script setup>
  import navBar from '@/components/nav-bar.vue'
  import { computed, onMounted, reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const show = ref(false)
  const form = reactive({
    // 对象名称
    objName: '',
    // 诉求类型
    talkType: '',
    // 区域地址
    spaceValue: '',
    // 详细地址
    address: '',
    // 诉求描述
    message: ''
  })
  // 地址详情
  const spaceAndMessage = computed(() => {
    return form.spaceValue + '/' + form.address
  })
  const cascaderValue = ref('')
  // const spaceValue = ref('')
  // const message = ref('')
  const onSubmit = () => {
    console.log(123)
  }
  const options = ref([
    {
      text: '浙江省',
      value: '330000',
      children: [{ text: '杭州市', value: '330100' }]
    },
    {
      text: '江苏省',
      value: '320000',
      children: [{ text: '南京市', value: '320100' }]
    }
  ])
  const onFinish = ({ selectedOptions }) => {
    show.value = false
    form.spaceValue = selectedOptions.map((option) => option.text).join('/')
  }
  // 是否战术诉求菜单
  const showType = ref(false)
  //诉求类型详情
  const typeValue = ref('')
  //诉求列表
  const TypeList = ref([
    {
      text: '噪声',
      value: '噪声'
    },
    {
      text: '废气',
      value: '废气'
    },
    {
      text: '废水',
      value: '废水'
    },
    {
      text: '固废',
      value: '固废'
    },
    {
      text: '其他',
      value: '其他'
    }
  ])
  // 诉求表单回调
  const typeFinish = ({ selectedOptions }) => {
    showType.value = false
    form.talkType = selectedOptions.map((option) => option.text).join('/')
  }

  const value = ref([{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }])
  onMounted(() => {
    console.log(route.params)
  })
</script>

<style lang="scss" scoped></style>
