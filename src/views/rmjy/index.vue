<template>
  <div class="tw-flex tw-h-[100%] tw-w-[100%] tw-flex-col">
    <nav-bar title="人民建议征集"></nav-bar>

    <div class="tw-mt-[24px] tw-w-[100%] tw-flex-1 tw-overflow-auto tw-px-[14px]">
      <!-- 事项内容 -->
      <p class="tw-text-[17px] tw-font-semibold tw-text-[#4A4A4A]">事项内容</p>
      <van-form
        :readonly="!isCreate"
        class="custom_van_form tw-pt-[14px]"
        @submit="onSubmit">
        <!-- <van-cell-group
          inset
          style="margin: 0">
        </van-cell-group> -->
        <!-- 意见建议名称 -->
        <van-field
          v-model="form.title"
          name="用户名"
          label="意见建议名称"
          :rules="peopleOpinionTitle"
          placeholder="请输入名称">
        </van-field>
        <!-- 意见建议描述 -->
        <p class="tw-mt-[22px] tw-text-[16px] tw-font-semibold tw-text-[#666666]">意见建议描述</p>
        <van-field
          v-model="form.description"
          rows="4"
          autosize
          label=""
          type="textarea"
          :rules="peopleOpinionMessage"
          show-word-limit>
        </van-field>
        <p class="tw-mt-[22px] tw-text-[16px] tw-font-semibold tw-text-[#666666]">附件说明</p>
        <upload-file
          v-model="form.filePath"
          :readonly="!isCreate">
        </upload-file>
        <div
          v-if="isCreate"
          class="tw-mt-[144px]">
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
  import UploadFile from '@/components/upload-file.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { reactive, computed, onMounted } from 'vue'
  import { peopleOpinionTitle, peopleOpinionMessage } from '@/configs/globalvar'
  import { createAppeal, getAppealDetail } from '@/apis/index'
  import { Toast } from 'vant'
  const route = useRoute()
  const router = useRouter()
  const form = reactive({
    description: '',
    title: '',
    filePath: [],
    orderType: 2
  })
  onMounted(() => {
    if (route.params.mode === 'detail') {
      getAppealDetail(route.params.id)
        .then((res) => {
          if (res.data.code === 0) {
            const { description, title, filePath, processStatus } = res.data.data
            form.description = description
            form.title = title
            form.filePath = JSON.parse(filePath)
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
        Toast('服务器出错,提交失败')
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
