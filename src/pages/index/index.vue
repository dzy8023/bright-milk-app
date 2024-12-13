<script setup lang="ts">
import { BannerItem, HomeHotItem } from '@/types/home'
import CustomNavbar from './components/CustomNavbar.vue'
import HotPanel from './components/HotPanel.vue'
import { ref } from 'vue'
import { getHomeBannerApi, getHomeHotApi } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { useGuessList } from '@/composables'
import PageSkeleton from './components/PageSkeleton.vue'
//获取屏幕边界到安全区的距离
let top = 0
// #ifdef MP-WEIXIN
top = wx.getWindowInfo().safeArea.top
// #endif
// #ifndef MP-WEIXIN
top = uni.getSystemInfoSync().safeAreaInsets?.top || 0
// #endif
const bannerList = ref<BannerItem[]>([])
const hotList = ref<HomeHotItem[]>([])
const isInit = ref(true)
const loading = ref(false)

const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  console.log(res)
  bannerList.value = res.result
}
const getHomeHotData = async () => {
  const res = await getHomeHotApi()
  console.log(res)
  hotList.value = res.result
}

const { guessRef, onScrollToLower } = useGuessList()

const onRefresherrefresh = async () => {
  loading.value = true
  try {
    // 重置数据
    guessRef.value?.resetData()
    // 等待所有请求完成
    await Promise.all([
      getHomeBannerData(), // 确保这三个函数返回的是 Promise
      getHomeHotData(),
      guessRef.value?.getMore(), // 等待 guessRef 组件加载完成
    ])
  } catch (error) {
    console.error('请求失败:', error)
    // 可以根据需要在这里处理请求失败的情况
  } finally {
    loading.value = false // 确保无论如何 loading 最终会变为 false
  }
}
onLoad(async () => {
  await Promise.all([getHomeBannerData(), getHomeHotData()])
  isInit.value = false
})
</script>

<template>
  <view class="viewport">
    <CustomNavbar :top="top" />
    <scroll-view
      class="scroll-view"
      scroll-y
      :enable-flex="true"
      refresher-enabled
      :refresher-triggered="loading"
      @scrolltolower="onScrollToLower"
      @refresherrefresh="onRefresherrefresh"
    >
      <PageSkeleton v-if="isInit" />
      <template v-else>
        <GMmkSwiper style="height: 30%" :list="bannerList" />
        <HotPanel :list="hotList" />
        <GMmkGuess ref="guessRef" />
      </template>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f8f8f8;
  height: 100%;
  overflow: hidden;
}
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
}
.scroll-view {
  flex: 1;
}
</style>
