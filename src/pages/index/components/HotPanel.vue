<script setup lang="ts">
import { HomeHotItem } from '@/types/home'

//
defineProps<{
  list: HomeHotItem[]
}>()
</script>

<template>
  <!-- 推荐专区 -->
  <view class="panel hot">
    <view v-for="item in list" :key="item.id" class="item">
      <view class="title">
        <text class="title-text">{{ item.title }}</text>
        <text class="title-alt">{{ item.alt }}</text>
      </view>
      <navigator
        hover-class="none"
        :url="`/pages/hot/hot?type=${item.id}&title=${item.title}&href=${item.href}`"
        class="cards"
      >
        <image class="image" mode="aspectFit" :src="item.images[0]"></image>
        <image class="image" mode="aspectFit" :src="item.images[1]"></image>
      </navigator>
    </view>
  </view>
</template>
<style lang="scss">
@use '../styles/HotPanel.scss';
</style>
