<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col">
    <Nav-bar title="我的事项"></Nav-bar>
    <div class="tw-p-[16px] tw-pb-[12px]">
      <van-field
        v-model="mySelf.keyword"
        style="background-color: #f0f0f0; border-radius: 6px"
        label=" "
        label-width="1px"
        left-icon="search"
        placeholder="请输入关键字进行搜索"
        @click-left-icon="clickIcon"
        @keyup.enter="keyUp">
      </van-field>
    </div>
    <!-- 选择事项 -->
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="mySelf.orderType"
        :options="eventType"
        @change="varietyChange">
      </van-dropdown-item>
      <van-dropdown-item
        v-model="mySelf.processStatus"
        :options="eventStatus"
        @change="statusChange">
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- list -->
    <div
      ref="el"
      class="tw-w-[100%] tw-flex-1 tw-overflow-auto">
      <!-- 下拉刷新 -->
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="tw-mx-auto tw-px-[14px] tw-h-[88px] tw-my-[16px]"
          @click="go(item)">
          <div class="tw-text-[17px] tw-font-semibold">
            <span>{{ item.title }}</span>
          </div>
          <div class="tw-flex tw-justify-between tw-mt-[8px]">
            <div class="tw-text-[11px] tw-font-normal tw-text-[#858585]">
              {{ item.createdAt }}
            </div>
            <div
              class="tw-text-[13px] tw-font-medium"
              :class="item.processStatus === 1 ? 'green' : 'orange'">
              <span>{{ item.processStatus === 1 ? '待办理' : '已完成' }}</span>
            </div>
          </div>
        </div>
      </van-pull-refresh>
      <p
        v-if="isFinish"
        class="tw-text-center tw-text-[#999999] tw-text-[12px] tw-mt-[10px] tw-pb-[20px]">
        到底了
      </p>
    </div>
    <van-loading
      v-if="bottomLoading"
      class="tw-mx-auto">
    </van-loading>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue' //reactive
  import NavBar from '@/components/nav-bar.vue'
  import { useRouter } from 'vue-router'
  import { useInfiniteScroll } from '@vueuse/core'
  import { Toast } from 'vant'
  import { getMyOrderList } from '@/api/index'
  const router = useRouter()
  const mySelf = reactive({
    //关键字
    keyword: '',
    //诉求类型
    orderType: '0',
    //诉求状态
    processStatus: '0',
    pageNum: 1,
    pageSize: 10
  })
  const eventType = [
    { text: '全部', value: '0' },
    { text: '局长信箱', value: '3' },
    { text: '在线诉求', value: '1' },
    { text: '人民建议征集', value: '2' }
  ]
  const eventStatus = [
    { text: '全部', value: '0' },
    { text: '待办理', value: '1' },
    { text: '已完成', value: '2' }
  ]
  const go = (item) => {
    console.log(item)
    item.orderType === 3
      ? router.push(`/jzxx/detail/${item.id}`)
      : item.orderType === 2
      ? router.push(`/rmjy/detail/${item.id}`)
      : router.push(`/wdsq/appeal/detail/${item.id}`)
  }

  const list = ref([])
  const el = ref(null)
  // 是否完成
  const isFinish = ref(false)
  // 加载效果
  const isLoading = ref(false)
  // 底部是否出现加载
  const bottomLoading = ref(false)

  const getList = (keepLoading) => {
    if (!isFinish.value) {
      getMyOrderList(mySelf)
        .then((res) => {
          if (res.data.code === 0) {
            if (mySelf.pageNum == res.data.data.lastPage) {
              if (keepLoading && keepLoading == 'next') {
                res.data.data.list.map((item) => {
                  list.value.push(item)
                })
              } else {
                list.value = res.data.data.list
              }
              //数据获取完毕
              console.log('数据获取完毕')
              mySelf.pageNum = res.data.data.lastPage
              isFinish.value = true
            } else {
              if (keepLoading && keepLoading == 'next') {
                res.data.data.list.map((item) => {
                  list.value.push(item)
                })
              } else {
                list.value = res.data.data.list
              }
            }
            mySelf.pageNum++
            bottomLoading.value = false
            isLoading.value = false
          } else {
            Toast(res.data.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  //无限滚动
  useInfiniteScroll(
    el,
    () => {
      // load more
      // 开启loading
      if (!isFinish.value) {
        bottomLoading.value = true
        getList('next')
      }
    },
    { distance: 40 }
  )

  onMounted(() => {
    getList()
  })
  // 下拉刷新
  const onRefresh = () => {
    // 开启加载
    isLoading.value = true
    isFinish.value = false
    mySelf.pageNum = 1
    getList('flash')
  }
  // 点击放大镜搜索
  const clickIcon = () => {
    isFinish.value = false
    mySelf.pageNum = 1
    getList()
  }
  // 回车搜索
  const keyUp = () => {
    isFinish.value = false
    mySelf.pageNum = 1
    getList()
  }
  // 切换类型
  const varietyChange = (val) => {
    isFinish.value = false
    mySelf.orderType = val
    mySelf.pageNum = 1
    getList()
  }
  // 切换状态
  const statusChange = (val) => {
    isFinish.value = false
    mySelf.processStatus = val
    mySelf.pageNum = 1
    getList()
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
