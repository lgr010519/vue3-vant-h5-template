<template>
  <div class="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col">
    <Nav-bar title="我的事项"></Nav-bar>
    <van-cell-group inset>
      <van-field
        @click-left-icon="clickIcon"
        @keyup.enter="keyUp"
        style="background-color: #f0f0f0; margin-top: 16px; border-radius: 6px 6px 6px 6px"
        v-model="mySelf.keyWord"
        label=" "
        label-width="1px"
        left-icon="search"
        placeholder="请输入关键字进行搜索"></van-field>
    </van-cell-group>
    <!-- 选择事项 -->
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="mySelf.variety"
        :options="eventType" />
      <van-dropdown-item
        v-model="mySelf.status"
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
              {{ item.createdAt }}
            </div>
            <div
              class="tw-text-[13px] tw-font-medium"
              :class="item.status === '已完成' ? 'green' : 'orange'">
              <span>{{ item.status === '1' ? '待办理' : '已完成' }}</span>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>
    <!-- <p v-if="isFinish" class="tw-text">到底啦</p> -->
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
  import { getMyOrderList } from '@/api/index'
  const router = useRouter()
  const mySelf = reactive({
    keyWord: '',
    variety: '',
    status: '',
    pageNum: 1,
    pageSize: 10
  })
  const eventType = [
    { text: '全部', value: '' },
    { text: '局长信箱', value: '3' },
    { text: '在线诉求', value: '1' },
    { text: '人民建议征集', value: '2' }
  ]
  const eventStatus = [
    { text: '全部', value: '' },
    { text: '待办理', value: '1' },
    { text: '已完成', value: '2' }
  ]
  const go = (item) => {
    item.type === '局长信箱'
      ? router.push(`/jzxx/detail/${item.id}`)
      : router.push(`/rmjy/detail/${item.id}`)
  }

  const list = ref([])
  const el = ref(null)
  const isFinish = ref(false)
  useInfiniteScroll(
    el,
    () => {
      // load more
      // 开启loading
      if (!isFinish.value) {
        bottomLoading.value = true
        setTimeout(() => {
          bottomLoading.value = false
        }, 1000)
      }
    },
    { distance: 40 }
  )
  const isLoading = ref(false)
  const onRefresh = () => {
    isLoading.value = true
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
  // 底部是否出现加载
  const bottomLoading = ref(false)

  const getList = () => {
    getMyOrderList(mySelf)
      .then((res) => {
        if (res.data.code === 0) {
          if (res.data.data.list.length < 10) {
            // 数据全部请求完成
            isFinish.value = true
            res.data.data.list.map((item) => {
              list.value.push(item)
            })
          } else {
            // 加载成功
            mySelf.pageNum + 1
            //用list接收
            list.value = res.data.data.list
          }
        } else {
          Toast(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  onMounted(() => {
    getList()
  })
  // 点击放大镜搜索
  const clickIcon = () => {
    console.log(mySelf)
  }
  const keyUp = () => {
    console.log(mySelf)
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
