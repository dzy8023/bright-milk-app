<script setup lang="ts">
import { BannerItem } from '@/types/home'
import { ref } from 'vue'
defineProps<{
  list: BannerItem[]
}>()
const activeIndex = ref(0)
const onChange: UniHelper.SwiperOnChange = (e) => {
  activeIndex.value = e.detail.current
}
</script>

<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="false" :interval="3000" @change="onChange">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator :url="item.href" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.image" />
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text
        v-for="(item, index) in list"
        :key="item.id"
        class="dot"
        :class="{ active: index === activeIndex }"
      />
    </view>
  </view>
</template>

<style lang="scss">
@use '@/components/styles/GMmkSwiper.scss';
</style>
