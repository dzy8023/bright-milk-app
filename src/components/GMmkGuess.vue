<script setup lang="ts">
import { getHomeGuessLikeApi } from '@/services/home'
import { GoodItem } from '@/types/item'
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
  <GMmkGoodList :list="list" />
  <view class="loading-text">{{
    state === 'loading' ? '正在加载...' : state === 'finish' ? '没有更多了' : '加载完成'
  }}</view>
</template>

<style lang="scss">
@use '@/components/styles/GMmkGuess.scss';
</style>
