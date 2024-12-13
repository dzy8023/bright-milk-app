// src/pages/goods/goods.vue
<script setup lang="ts">
import { useSafeAreaBottom } from '@/composables'
import { getGoodsByIdAPI } from '@/services/goods'
import { GoodsResult } from '@/types/good'
import { ref } from 'vue'
// 获取屏幕边界到安全区域距离
const bottom = useSafeAreaBottom()
// 接收页面参数
const query = defineProps<{
  id: string
}>()
console.log(query.id)
const goods = ref<GoodsResult>()
const getGoodsByIdData = async () => {
  const res = await getGoodsByIdAPI(query.id)
  goods.value = res.result
  console.log(res.result)
}
// 轮播图变化时
const currentIndex = ref(0)
const onChange: UniHelper.SwiperOnChange = (ev) => {
  currentIndex.value = ev.detail.current
}

// 点击图片时
const onTapImage = (url: string) => {
  // 大图预览
  uni.previewImage({
    current: url,
    urls: goods.value!.mainImages,
  })
}
getGoodsByIdData()
</script>

<template>
  <view class="viewport">
    <scroll-view scroll-y class="scroll-view">
      <!-- 基本信息 -->
      <view class="goods">
        <!-- 商品主图 -->
        <view class="preview">
          <swiper circular @change="onChange">
            <swiper-item v-for="item in goods?.mainImages" :key="item">
              <image mode="aspectFill" :src="item" @tap="onTapImage(item)" />
            </swiper-item>
          </swiper>
          <view class="indicator">
            <text class="current">{{ currentIndex + 1 }}</text>
            <text class="split">/</text>
            <text class="total">{{ goods?.mainImages.length }}</text>
          </view>
        </view>

        <!-- 商品简介 -->
        <view class="meta">
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods?.price }}</text>
          </view>
          <view class="name ellipsis">{{ goods?.name }} </view>
          <view class="desc">{{ goods?.desc }} </view>
        </view>

        <!-- 操作面板 -->
        <view class="action">
          <view class="item arrow">
            <text class="label">选择</text>
            <text class="text ellipsis"> 请选择商品规格 </text>
          </view>
          <view class="item arrow">
            <text class="label">送至</text>
            <text class="text ellipsis"> 请选择收获地址 </text>
          </view>
          <view class="item arrow">
            <text class="label">服务</text>
            <text class="text ellipsis"> 无忧退 快速退款 免费包邮 </text>
          </view>
        </view>
      </view>

      <!-- 商品详情 -->
      <view class="detail panel">
        <view class="title">
          <text>详情</text>
        </view>
        <view class="content">
          <view class="properties">
            <!-- 属性详情 -->
            <view v-for="(item, index) in goods?.details.properties" :key="index" class="item">
              <text class="label">{{ item.name }}</text>
              <text class="value">{{ item.value }}</text>
            </view>
          </view>
          <!-- 图片详情 -->
          <image v-for="item in goods?.details.images" :key="item" mode="widthFix" :src="item" />
        </view>
      </view>

      <!-- 同类推荐 -->
      <view class="similar panel">
        <view class="title">
          <text>同类推荐</text>
        </view>
        <GMmkGoodList :list="goods?.similarProducts!" />
        <!-- <view class="content">
          <navigator
            v-for="item in 4"
            :key="item"
            class="goods"
            hover-class="none"
            :url="`/pages/goods/goods?id=`"
          >
            <image
              class="image"
              mode="aspectFill"
              src="https://yanxuan-item.nosdn.127.net/e0cea368f41da1587b3b7fc523f169d7.png"
            ></image>
            <view class="name ellipsis">简约山形纹全棉提花毛巾</view>
            <view class="price">
              <text class="symbol">¥</text>
              <text class="number">18.50</text>
            </view>
          </navigator>
        </view> -->
      </view>
    </scroll-view>
    <!-- 用户操作 -->
    <view class="toolbar" :style="{ paddingBottom: bottom + 'px' }">
      <view class="icons">
        <button class="icons-button"><text class="icon-heart"></text>收藏</button>
        <button class="icons-button" open-type="contact">
          <text class="icon-handset"></text>客服
        </button>
        <navigator class="icons-button" url="/pages/cart/cart" open-type="switchTab">
          <text class="icon-cart"></text>购物车
        </navigator>
      </view>
      <view class="buttons">
        <view class="addcart"> 加入购物车 </view>
        <view class="buynow"> 立即购买 </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@use './styles/goods.scss';
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
