<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col">
    <Nav-bar title="我的事项"></Nav-bar>
    <van-cell-group inset>
      <van-field
        style="background-color: #f0f0f0; margin-top: 16px; border-radius: 6px 6px 6px 6px"
        v-model="keyWord"
        label=" "
        label-width="1px"
        left-icon="search"
        placeholder="请输入关键字进行搜索"></van-field>
    </van-cell-group>
    <!-- 选择事项 -->
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="value1"
        :options="option1" />
      <van-dropdown-item
        v-model="value2"
        :options="option2" />
    </van-dropdown-menu>
    <!-- list -->
    <div class="tw-w-[100%] tw-flex-1 tw-overflow-auto">
      <div
        class="tw-mx-auto tw-px-[14px] tw-h-[88px] tw-my-[16px]"
        v-for="(item, index) in list"
        :key="index"
        @click="go(item)">
        <div class="tw-text-[17px] tw-font-semibold">
          <span>{{ item.chinese }}</span>
        </div>
        <div class="tw-flex tw-justify-between tw-mt-[8px]">
          <div class="tw-text-[11px] tw-font-normal tw-text-[#858585]">
            {{ item.time }}
          </div>
          <div
            class="tw-text-[13px] tw-font-medium"
            :class="item.status === '已完成' ? 'green' : 'orange'">
            <span>{{ item.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue' //reactive
  import NavBar from '@/components/nav-bar.vue'
  import { useRouter } from 'vue-router'
  const keyWord = ref('')
  const router = useRouter()
  // const listData = reactive([
  //   {
  //     text: '哈哈哈哈',
  //     time: '2020-09-28 12:20:28',
  //     status: '待办理'
  //   },
  //   {
  //     text: '哈哈哈哈',
  //     time: '2020-09-28 12:20:28',
  //     status: '待办理'
  //   },
  //   {
  //     text: '哈哈哈哈',
  //     time: '2020-09-28 12:20:28',
  //     status: '待办理'
  //   }
  // ])
  const value1 = ref(99)
  const value2 = ref('s')
  const option1 = [
    { text: '全部', value: 99 },
    { text: '局长信箱', value: 0 },
    { text: '在线诉求', value: 1 },
    { text: '人民建议征集', value: 2 }
  ]
  const option2 = [
    { text: '全部', value: 's' },
    { text: '待办理', value: 'a' },
    { text: '已完成', value: 'b' }
  ]
  const list = [
    {
      id: 0,
      chinese: '诉求对象名称这是一段话这是一段诉求对象的名称文字',
      time: '2020-09-28 12:20:28',
      status: '待办理',
      type: '局长信箱'
    },
    {
      id: 2,
      chinese: '诉求对象名称这是一段话这是一段诉求对象的名称文字',
      status: '已完成',
      time: '2020-09-28 12:20:28',
      type: '人民建议'
    },
    {
      id: 3,
      chinese: '诉求对象名称这是一段话这是一段诉求对象的名称文字',
      status: '已完成',
      time: '2020-09-28 12:20:28',
      type: '局长信箱'
    },
    {
      id: 4,
      chinese: '诉求对象名称这是一段话这是一段诉求对象的名称文字',
      status: '已完成',
      time: '2020-09-28 12:20:28',
      type: '人民建议'
    },
    {
      id: 5,
      chinese: '诉求对象名称这是一段话这是一段诉求对象的名称文字',
      status: '已完成',
      time: '2020-09-28 12:20:28',
      type: '人民建议'
    },
    {
      id: 6,
      chinese: '诉求对象名称这是一段话这是一段诉求对象的名称文字',
      status: '已完成',
      time: '2020-09-28 12:20:28',
      type: '局长信箱'
    },
    {
      id: 7,
      chinese: '诉求对象名称这是一段话这是一段诉求对象的名称文字',
      status: '已完成',
      time: '2020-09-28 12:20:28',
      type: '局长信箱'
    }
  ]
  const go = (item) => {
    item.type === '局长信箱'
      ? router.push(`/jzxx/detail/${item.id}`)
      : router.push(`/rmjy/detail/${item.id}`)
  }
</script>

<style lang="scss" scoped>
  .green {
    color: #f5754e;
  }
  .orange {
    color: #57d3a2;
  }
</style>
