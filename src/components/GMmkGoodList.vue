<script setup lang="ts">
import { GoodItem } from '@/types/good'

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
defineProps<{
  list: GoodItem[]
}>()
</script>
<template>
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
</template>
<style lang="scss">
@use '@/components/styles/GMmkGoodList.scss';
</style>
