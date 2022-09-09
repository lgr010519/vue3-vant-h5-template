<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col">
    <nav-bar title="人民建议征集"></nav-bar>

    <div class="tw-mt-[24px] tw-px-[14px] tw-w-[100%] tw-flex-1 tw-overflow-auto">
      <!-- 事项内容 -->
      <div class="tw-text-[#4A4A4A] tw-text-[17px] tw-font-semibold">
        <span>事项内容</span>
      </div>
      <van-form
        @submit="onSubmit"
        style="padding: 0; margin-top: 24px">
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
        <div class="tw-mt-[22px] tw-text-[14px] tw-text-[#666666]">
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
        <div class="tw-mt-[22px] tw-text-[14px] tw-text-[#666666]">
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
        <div style="margin: 10px">
          <van-button
            style="border-radius: 6px 6px 6px 6px"
            block
            type="primary"
            native-type="submit">
            确认修改
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
  import navBar from '@/components/nav-bar.vue'
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { reactive, ref } from 'vue'
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
    console.log(route.params)
  })
</script>

<style></style>
