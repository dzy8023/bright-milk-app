<script setup lang="ts">
//
import { getHomeBannerApi } from '@/services/home'
import { getCategoryTopApi } from '@/services/category'
import { BannerItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { CategoryTopItem } from '@/types/category'
import GMmkSwiper from '@/components/GMmkSwiper.vue'
import PageSkeleton from './components/PageSkeleton.vue'

const bannerList = computed(() => {
  return categoryTopList.value[currentTap.value]?.banner || []
})
const currentTap = ref(0)
const categoryTopList = ref<CategoryTopItem[]>([])
const isInit = ref(true)
// const getBannerData = async () => {
//   const res = await getHomeBannerApi(2)
//   bannerList.value = res.result
// }
const getCategoryTopDate = async () => {
  //TODO:获取一级分类数据
  const res = await getCategoryTopApi()
  categoryTopList.value = res.result
  console.log(categoryTopList.value)
}
onLoad(async () => {
  // getBannerData(),
  await Promise.all([getCategoryTopDate()])
  isInit.value = false
})
//提取当前分类的二级分类数据
const subCategoryList = computed(() => {
  return categoryTopList.value[currentTap.value]?.children || []
})
</script>

<template>
  <PageSkeleton v-if="isInit" />
  <view v-else class="viewport">
    <!-- 搜索框 -->
    <view class="search">
      <view class="input">
        <text class="icon-search">女靴</text>
      </view>
    </view>
    <!-- 分类 -->
    <view class="categories">
      <!-- 左侧：一级分类 -->
      <scroll-view class="primary" scroll-y>
        <view
          v-for="(item, index) in categoryTopList"
          :key="item.id"
          class="item"
          :class="{ active: index === currentTap }"
          @tap="currentTap = index"
        >
          <text class="name"> {{ item.name }} </text>
        </view>
      </scroll-view>
      <!-- 右侧：二级分类 -->
      <scroll-view class="secondary" scroll-y>
        <!-- 焦点图 -->
        <GMmkSwiper :list="bannerList" />
        <!-- 内容区域 -->
        <view v-for="item in subCategoryList" :key="item.id" class="panel">
          <view class="title">
            <text class="name">{{ item.name }}</text>
            <navigator class="more" hover-class="none">全部</navigator>
          </view>
          <view class="section">
            <navigator
              v-for="goods in item.goods"
              :key="goods.id"
              class="goods"
              hover-class="none"
              :url="`/pages/goods/goods?id=${goods.id}`"
            >
              <image class="image" :src="goods.image"></image>
              <view class="name ellipsis">{{ goods.name }}</view>
              <view class="price">
                <text class="symbol">¥</text>
                <text class="number">{{ goods.price }}</text>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<style lang="scss">
@use './styles/category.scss';
page {
  height: 100%;
  overflow: hidden;
}
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
