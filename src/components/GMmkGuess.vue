<script setup lang="ts">
import { getHomeGuessLikeApi } from '@/services/home'
import { GoodItem } from '@/types/good'
import { PageQuery } from '@/types/pageQuery'
import { onMounted, ref } from 'vue'

//
const list = ref<GoodItem[]>([])
const pageData: Required<PageQuery> = { page: 1, pageSize: 6 }
const state = ref<'loading' | 'loaded' | 'error' | 'finish'>('loaded')
let maxPages = 1
const getGuessLikeData = async () => {
  if (state.value === 'loaded') {
    state.value = 'loading'
    const res = await getHomeGuessLikeApi(pageData)
    console.log(res.result)
    list.value?.push(...res.result.items)
    if (pageData.page >= res.result.pages) {
      pageData.page = 1
    } else {
      pageData.page += 1
    }
    if (res.result.pages > maxPages) {
      maxPages = res.result.pages
    }
    state.value = 'loaded'
    if (list.value.length >= res.result.counts) {
      state.value = 'finish'
    }
  } else if (state.value === 'finish') {
    uni.showToast({
      title: '没有更多了',
      icon: 'none',
    })
  }
}
//重置数据
const resetData = () => {
  list.value = []
  if (pageData.page > maxPages) {
    pageData.page = 1
  }
  state.value = 'loaded'
}
const endColor = `rgb(207, 68, 68)`
const startColor = `rgb(144, 238, 144)`
const standardSales = 600
const salesColor = (sales: number) => {
  const percent = Math.min(sales / standardSales, 1)
  var r = parseInt(startColor.slice(4, -1).split(',')[0])
  var g = parseInt(startColor.slice(4, -1).split(',')[1])
  var b = parseInt(startColor.slice(4, -1).split(',')[2])
  r = r + (parseInt(endColor.slice(4, -1).split(',')[0]) - r) * percent
  g = g + (parseInt(endColor.slice(4, -1).split(',')[1]) - g) * percent
  b = b + (parseInt(endColor.slice(4, -1).split(',')[2]) - b) * percent
  r = Math.round(r)
  g = Math.round(g)
  b = Math.round(b)
  return `rgb(${r},${g},${b})`
}
//组件挂载完毕
onMounted(() => {
  getGuessLikeData()
})
//暴露方法
defineExpose({
  resetData,
  getMore: getGuessLikeData,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      v-for="item in list"
      :key="item.id"
      class="guess-item"
      :url="`/pages/goods/goods?id=${item.id}`"
    >
      <image class="image" mode="aspectFill" :src="item.image"></image>
      <view class="row-view">
        <view class="name"> {{ item.name }} </view>
        <uni-icons type="fire" :color="salesColor(item.sales!)" size="26rpx">{{
          item.sales
        }}</uni-icons>
      </view>
      <view class="row-view">
        <view class="price">
          <text class="small">¥</text>
          <text>{{ item.price.toFixed(2) }}</text>
        </view>
        <view class="tag-view">
          <uni-tag :inverted="true" text="会员折扣" type="warning" size="small" />
          <text class="price small"> {{ item.discount?.toFixed(2) }}</text>
        </view>
      </view>
    </navigator>
  </view>
  <view class="loading-text">{{
    state === 'loading' ? '正在加载...' : state === 'finish' ? '没有更多了' : '加载完成'
  }}</view>
</template>

<style lang="scss">
:host {
  display: block;
}
/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }
  .image {
    width: 304rpx;
    height: 304rpx;
  }
  .row-view {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .sales {
    font-size: 24rpx;
    color: #999;
  }
  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }
  .small {
    font-size: 80%;
  }
}
// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
