<script setup lang="ts">
import { BannerItem } from '@/types/home'
import CustomNavbar from './components/CustomNavbar.vue'
import { ref } from 'vue'
import { getHomeBannerListApi } from '@/services/home'
//获取屏幕边界到安全区的距离
let top = 0
// #ifdef MP-WEIXIN
top = wx.getWindowInfo().safeArea.top
// #endif
// #ifndef MP-WEIXIN
top = uni.getSystemInfoSync().safeAreaInsets?.top || 0
// #endif
const bannerList = ref<BannerItem[]>([])
const getHomeBannerListData = async () => {
  const res = await getHomeBannerListApi()
  console.log(res)
  bannerList.value = res.result
}
getHomeBannerListData()
</script>

<template>
  <view class="viewport">
    <CustomNavbar :top="top" />
    <scroll-view class="scroll-view">
      <GMmkSwiper :list="bannerList" />
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
