<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col">
    <Nav-bar title="我的事项"></Nav-bar>
    <van-cell-group inset>
      <van-field
        @click-left-icon="clickIcon"
        @keyup.enter="keyUp"
        style="background-color: #f0f0f0; margin-top: 16px; border-radius: 6px 6px 6px 6px"
        v-model="obj.keyWord"
        label=" "
        label-width="1px"
        left-icon="search"
        placeholder="请输入关键字进行搜索"></van-field>
    </van-cell-group>
    <!-- 选择事项 -->
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="obj.type"
        :options="eventType" />
      <van-dropdown-item
        v-model="obj.status"
        :options="eventStatus" />
    </van-dropdown-menu>
    <!-- list -->
    <div
      class="tw-w-[100%] tw-flex-1 tw-overflow-auto"
      ref="el">
      <!-- 下拉刷新 -->
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh">
        <div
          class="tw-mx-auto tw-px-[14px] tw-h-[88px] tw-my-[16px]"
          v-for="(item, index) in list"
          :key="index"
          @click="go(item)">
          <div class="tw-text-[17px] tw-font-semibold">
            <span>{{ item.title }}</span>
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
      </van-pull-refresh>
    </div>
    <van-loading
      class="tw-mx-auto"
      v-if="bottomLoading">
    </van-loading>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue' //reactive
  import NavBar from '@/components/nav-bar.vue'
  import { useRouter } from 'vue-router'
  import { useInfiniteScroll } from '@vueuse/core'
  import { Toast } from 'vant'
  const router = useRouter()
  const obj = reactive({
    keyWord: '',
    type: '全部',
    status: '全部'
  })
  const eventType = [
    { text: '全部', value: '全部' },
    { text: '局长信箱', value: '局长信箱' },
    { text: '在线诉求', value: '在线诉求' },
    { text: '人民建议征集', value: '人民建议征集' }
  ]
  const eventStatus = [
    { text: '全部', value: '全部' },
    { text: '待办理', value: '待办理' },
    { text: '已完成', value: '已完成' }
  ]
  const go = (item) => {
    item.type === '局长信箱'
      ? router.push(`/jzxx/detail/${item.id}`)
      : router.push(`/rmjy/detail/${item.id}`)
  }
  // 测试数据
  const count = ref(5)
  const list = ref([])

  const el = ref(null)
  useInfiniteScroll(
    el,
    () => {
      // load more
      // 开启loading
      bottomLoading.value = true
      setTimeout(() => {
        Toast('更新成功')
        bottomLoading.value = false
      }, 1000)
    },
    { distance: 40 }
  )
  const isLoading = ref(false)
  const onRefresh = () => {
    isLoading.value = true
    setTimeout(() => {
      Toast('刷新成功')
      isLoading.value = false
    }, 1000)
  }
  // 底部是否出现加载
  const bottomLoading = ref(false)
  onMounted(() => {
    for (let i = 0; i < count.value; i++) {
      list.value.push({
        id: 2,
        title: '诉求对象名称这是一段话这是一段诉求对象的名称文字',
        status: '已完成',
        time: '2020-09-28 12:20:28',
        type: '人民建议'
      })
    }
  })

  // 点击放大镜搜索
  const clickIcon = () => {
    console.log(obj)
  }
  const keyUp = () => {
    console.log(obj)
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
