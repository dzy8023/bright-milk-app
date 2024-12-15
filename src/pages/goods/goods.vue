// src/pages/goods/goods.vue
<script setup lang="ts">
import { useSafeAreaBottom } from '@/composables'
import { getGoodsByIdApi } from '@/services/goods'
import { GoodsResult } from '@/types/good'
import { computed, ref } from 'vue'
import ServicePanel from './components/ServicePanel.vue'
import {
  SkuPopupEvent,
  SkuPopupInstance,
  SkuPopupLocalData,
} from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup'
import PageSkeleton from './components/PageSkeleton.vue'
import { postMemberCartApi } from '@/services/cart'

// 获取屏幕边界到安全区域距离
const bottom = useSafeAreaBottom()
// 接收页面参数
const query = defineProps<{
  id: string
}>()
console.log(query.id)
const goods = ref<GoodsResult>()

// 轮播图变化时
const currentIndex = ref(0)
//uni-ui 弹出层
const popup = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()
// 弹出层类型
//选择生产日期弹出层
const popupType = ref<'address' | 'service'>()
const service = ref<string>()
//是否无需背景颜色（空心标签）
const inverted = ref(false)
const isShowSku = ref(false)
const localData = ref({} as SkuPopupLocalData)
enum SkuMode {
  Both = 1,
  Cart = 2,
  Buy = 3,
}
const mode = ref<SkuMode>(SkuMode.Both)
const skuPopupRef = ref<SkuPopupInstance>()
const openPopup = (type: typeof popupType.value) => {
  popupType.value = type
  popup.value?.open()
}
const onAddressPanelClose = () => {
  popup.value?.close()
}

const onServicePanelClose = (content?: string) => {
  console.log(content)
  service.value = content
  popup.value?.close()
}
// 轮播图变化时
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
const getGoodsByIdData = async () => {
  const res = await getGoodsByIdApi(query.id)
  goods.value = res.result
  console.log('goods', goods.value)
  // SKU组件所需格式
  localData.value = {
    _id: res.result.id,
    name: res.result.name,
    goods_thumb: res.result.mainImages[0],
    spec_list: res.result.specs.map((v) => ({ name: v.name, list: v.values })),
    sku_list: res.result.skus.map((v) => ({
      _id: v.id,
      goods_id: res.result.id,
      goods_name: res.result.name,
      image: v.image,
      price: v.price * 100, // 注意：需要乘以 100
      stock: v.stock,
      sku_name_arr: v.specs.map((vv) => vv.valueName),
    })),
  }
  console.log('localData', localData.value)
}
getGoodsByIdData()
const openSkuPopup = (val: SkuMode) => {
  console.log(localData.value, isShowSku.value)
  if (localData.value && !isShowSku.value) {
    isShowSku.value = true
    //修改按钮模式
    mode.value = val
  } else {
    if (isShowSku.value) {
      isShowSku.value = false
    } else {
      uni.showToast({
        title: '商品信息加载中',
        icon: 'loading',
      })
    }
  }
}
const selectArrText = computed(() => {
  return skuPopupRef.value?.selectArr.join(' ').trim() || '请选择商品规格'
})
//加入购物车事件
const onAddCart = async (e: SkuPopupEvent) => {
  const res = await postMemberCartApi({ skuId: e._id, quantity: e.buy_num })
  console.log('onAddCart', res)
  uni.showToast({
    title: '加入购物车成功',
    icon: 'success',
    duration: 1000,
  })
  isShowSku.value = false
}
//立即购买事件
const onBuyNow = (e: SkuPopupEvent) => {
  console.log('onBuyNow', e)
  uni.navigateTo({ url: `/pagesOrder/create/create?skuId=${e._id}&count=${e.buy_num}` })
}
</script>

<template>
  <!--sku弹出层-->
  <vk-data-goods-sku-popup
    ref="skuPopupRef"
    v-model="isShowSku"
    :localdata="localData"
    :mode="mode"
    addCartBackgroundColor="#ff9402"
    buyNowBackgroundColor="#27ba9b"
    :activedStyle="{
      color: '#27ba9b',
      borderColor: '#27ba9b',
      backgroundColor: '#e5f5f1',
    }"
    @cart="onAddCart"
    @buy="onBuyNow"
  />
  <view class="viewport">
    <scroll-view scroll-y class="scroll-view">
      <PageSkeleton v-if="!goods" />
      <template v-else>
        <!-- 基本信息 -->
        <view class="goods">
          <!-- 商品主图 -->
          <view class="preview">
            <swiper circular @change="onChange">
              <swiper-item v-for="item in goods?.mainImages" :key="item">
                <image mode="scaleToFill" :src="item" @tap="onTapImage(item)" />
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
              <view class="column-view">
                <text class="symbol">¥</text>
                <text class="number">{{ goods?.price }}</text>
              </view>
              <view class="column-view">
                <uni-icons type="fire" color="#fff" size="24" />{{ goods?.sales }}
                <view class="tag-view">
                  <uni-tag
                    :inverted="inverted"
                    :text="`会员折扣 ${goods?.discount.toFixed(2)}`"
                    type="warning"
                    size="small"
                    @click="inverted = !inverted"
                  />
                </view>
              </view>
            </view>
            <view class="name ellipsis">{{ goods?.name }} </view>
            <view class="desc">{{ goods?.desc }} </view>
          </view>

          <!-- 操作面板 -->
          <view class="action">
            <view class="item arrow" @tap="openSkuPopup(SkuMode.Both)">
              <text class="label">选择</text>
              <text class="text ellipsis"> {{ selectArrText }} </text>
            </view>
            <view class="item arrow">
              <text class="label">送至</text>
              <text class="text ellipsis"> 请选择收获地址 </text>
            </view>
            <view class="item arrow" @tap="openPopup('service')">
              <text class="label">服务</text>
              <text class="text ellipsis"> {{ service ? service : '请选择服务' }} </text>
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
      </template>
    </scroll-view>
    <!-- 用户操作 -->
    <view class="toolbar" :style="{ paddingBottom: bottom + 'px' }">
      <view class="icons">
        <button class="icons-button"><text class="icon-heart"></text>收藏</button>
        <!--  #ifdef MP-WEIXIN -->
        <button class="icons-button" open-type="contact">
          <text class="icon-handset"></text>客服
        </button>
        <!-- #endif  -->
        <navigator class="icons-button" url="/pages/cart/cart" open-type="switchTab">
          <text class="icon-cart"></text>购物车
        </navigator>
      </view>
      <view class="buttons">
        <view class="addcart" @tap="openSkuPopup(SkuMode.Cart)"> 加入购物车 </view>
        <view class="buynow" @tap="openSkuPopup(SkuMode.Buy)"> 立即购买 </view>
      </view>
    </view>
  </view>

  <!--uni-ui 弹出层-->
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <ServicePanel v-if="popupType === 'service'" @close="onServicePanelClose" />
    <AddressPanel
      v-show="popupType === 'address'"
      ref="addressPanelRef"
      @close="onAddressPanelClose"
    />
  </uni-popup>
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
</style>
