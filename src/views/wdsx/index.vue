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
        @click-left-icon="search"
        @keyup.enter="search">
      </van-field>
    </div>
    <!-- 选择事项 -->
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="mySelf.orderType"
        title="事项类型"
        :options="eventType"
        @change="search">
      </van-dropdown-item>
      <van-dropdown-item
        v-model="mySelf.processStatus"
        title="事项状态"
        :options="eventStatus"
        @change="search">
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
          class="tw-mx-auto tw-px-[14px] tw-h-[76px] tw-mt-[16px]"
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
          <div class="list_item"></div>
        </div>
      </van-pull-refresh>
      <p
        v-if="!isMerge"
        class="tw-text-center tw-text-[#999999] tw-text-[12px] tw-mt-[10px] tw-pb-[20px]">
        {{ isMerge ? '加载中' : '没有啦' }}
      </p>
    </div>
    <van-loading
      v-if="bottomLoading"
      class="tw-mx-auto">
    </van-loading>
  </div>
</template>

<script setup>
  import { computed, onMounted, reactive, ref } from 'vue' //reactive
  import NavBar from '@/components/nav-bar.vue'
  import { useRouter } from 'vue-router'
  import { useInfiniteScroll } from '@vueuse/core'
  import { Toast } from 'vant'
  import * as api from '@/api/index'
  const router = useRouter()
  const mySelf = reactive({
    //关键字
    keyword: '',
    //诉求类型
    orderType: '0',
    //诉求状态
    processStatus: '0',

    pageNum: 1,
    pageSize: 10,
    lastPage: 0,
    //刷新类型(默认刷新)
    loading: ''
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

  // 加载效果
  const isLoading = ref(false)
  // 底部是否出现加载
  const bottomLoading = ref(false)
  // 是否有更多数据
  const isMerge = computed(() => mySelf.pageNum < mySelf.lastPage)

  // 顶部加载或者底部加载
  // const loading = computed()

  // 获取数据
  const getList = () => {
    api
      .getMyOrderList(mySelf)
      .then((res) => {
        if (res.data.code === 0) {
          const { list: listData, lastPage, currentPage } = res.data.data
          // 无限滚动
          if (mySelf.pageNum !== 1) {
            list.value = list.value.concat(listData)
          } else {
            // 刷新
            list.value = listData
          }
          mySelf.pageNum = currentPage
          mySelf.lastPage = lastPage
        } else {
          Toast(res.data.msg)
        }
        isLoading.value = false
        bottomLoading.value = false
      })
      .catch((err) => {
        bottomLoading.value = false
        isLoading.value = false
        console.log(err)
        Toast('服务器错误')
      })
  }
  //无限滚动
  useInfiniteScroll(
    el,
    // 开启loading
    () => {
      // 1、有更多的數據
      // 2、當前沒有請求
      if (isMerge.value && !bottomLoading.value) {
        mySelf.pageNum++
        bottomLoading.value = true
        getList()
      }
    },
    { distance: 20 }
  )

  onMounted(() => {
    getList()
  })

  // 下拉刷新
  const onRefresh = () => {
    isLoading.value = true
    search()
  }
  const search = () => {
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
  .list_item {
    width: 100%;
    height: 1px;
    margin-top: 14px;
    background-color: #f4f4f4;
  }
</style>
