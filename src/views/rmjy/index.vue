<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col">
    <nav-bar title="人民建议征集"></nav-bar>

    <div class="tw-mt-[24px] tw-px-[14px] tw-w-[100%] tw-flex-1 tw-overflow-auto">
      <!-- 事项内容 -->
      <div class="tw-text-[#4A4A4A] tw-text-[17px] tw-font-semibold">
        <span>事项内容</span>
      </div>
      <van-form
        :readonly="!isCreate"
        @submit="onSubmit"
        style="padding: 0; margin-top: 24px"
        class="custom_van_form">
        <van-cell-group
          inset
          style="margin: 0">
          <!-- 意见建议名称 -->
          <van-field
            style="padding: 0; height: 30px; background-color: #f9f9f9"
            v-model="form.name"
            name="用户名"
            label="意见建议名称"
            placeholder="请输入名称">
          </van-field>
        </van-cell-group>
        <!-- 意见建议描述 -->
        <div class="tw-mt-[22px] tw-text-[16px] tw-font-semibold tw-text-[#666666]">
          <span>意见建议描述</span>
        </div>
        <div>
          <van-field
            style="
              padding: 0;
              border: 1px solid #e0e0e0;
              margin-top: 12px;
              background-color: #f9f9f9;
            "
            v-model="form.message"
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
        <van-field
          style="padding: 0; margin-top: 12px; background-color: #f9f9f9"
          name="uploader"
          label="">
          <template #input>
            <van-uploader v-model="value" />
          </template>
        </van-field>
        <div
          style="margin: 10px"
          v-if="isCreate">
          <van-button
            style="border-radius: 6px 6px 6px 6px"
            block
            type="primary"
            native-type="submit">
            确认修改
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
  import { useRoute } from 'vue-router'
  import { reactive, ref, computed, onMounted } from 'vue'
  const route = useRoute()
  const form = reactive({
    message: '',
    name: ''
  })
  const value = ref([{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }])
  const onSubmit = () => {
    console.log(123)
  }
  onMounted(() => {
    if (route.params.mode === 'detail') {
      form.name = '李某人'
      form.message = '救救我啊'
    }
  })
  // 判断当前页面的展示状态
  const isCreate = computed(() => {
    return route.params.mode === 'create'
  })
</script>

<style></style>
