<template name="skeleton">
  <view class="goods goods">
    <view class="preview preview">
      <swiper :circular="true" :current="0" :autoplay="false"></swiper>
      <view class="indicator indicator">
        <text class="current sk-transparent sk-opacity">2</text>
        <text class="split sk-transparent sk-opacity">/</text>
        <text class="total sk-transparent sk-opacity">7</text>
      </view>
    </view>
    <view class="meta meta">
      <view class="price price">
        <view class="column-view column-view">
          <text class="symbol sk-transparent sk-opacity">¥</text>
          <text class="number sk-transparent sk-text-14-2857-826 sk-text">61.25</text>
        </view>
        <view class="column-view sk-transparent">
          <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
            <text
              class="uni-icons icons--uni-icons uniui-fire icons--uniui-fire sk-pseudo sk-pseudo-circle"
              style="color: #fff; font-size: 24px"
            ></text> </view
          >336
          <view class="tag-view tag-view">
            <view is="node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag">
              <text
                class="uni-tag tag--uni-tag data-v-980bad10 tag--data-v-980bad10 uni-tag--warning tag--uni-tag--warning uni-tag--small tag--uni-tag--small uni-tag-text--small tag--uni-tag-text--small sk-transparent sk-text-7-1429-249 sk-text"
                style="true"
                >会员折扣 7.74</text
              >
            </view>
          </view>
        </view>
      </view>
      <view class="name ellipsis sk-transparent sk-text-14-2857-179 sk-text">手工制作的钢桌子</view>
      <view class="desc sk-transparent sk-text-0-0000-510 sk-text"
        >可选16G【M2芯片】Apple/苹果 MacBook Pro
        13英寸笔记本电脑剪辑设计大学生办公专用正品分期24G</view
      >
    </view>
    <view class="action action">
      <view class="item arrow sk-pseudo sk-pseudo-circle">
        <text class="label sk-transparent sk-text-14-2857-10 sk-text">选择</text>
        <text class="text ellipsis sk-transparent sk-text-14-2857-664 sk-text">请选择商品规格</text>
      </view>
      <view class="item arrow sk-pseudo sk-pseudo-circle">
        <text class="label sk-transparent sk-text-14-2857-804 sk-text">送至</text>
        <text class="text ellipsis sk-transparent sk-text-14-2857-227 sk-text">
          请选择收获地址
        </text>
      </view>
      <view class="item arrow sk-pseudo sk-pseudo-circle">
        <text class="label sk-transparent sk-text-14-2857-394 sk-text">服务</text>
        <text class="text ellipsis sk-transparent sk-text-14-2857-947 sk-text"
          >收到退货包裹并确认无误后，将在48小时内办理退款，退款将原路返回，不同银行处理时间不同，预计1-5个工作日到账</text
        >
      </view>
    </view>
  </view>
  <view class="detail detail panel panel">
    <view class="title title">
      <text class="sk-transparent sk-text-0-0000-220 sk-text">详情</text>
    </view>
    <view class="content content">
      <view class="properties properties">
        <view class="item item">
          <text class="label sk-transparent sk-text-25-0000-704 sk-text">户外</text>
          <text class="value sk-transparent sk-text-25-0000-42 sk-text">软</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
/* #ifndef MP-WEIXIN */
@use '../styles/goods.scss';
/* #endif */
.sk-transparent {
  color: transparent !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-826 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 78.4rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-7-1429-249 {
  background-image: linear-gradient(
    transparent 7.1429%,
    #eeeeee 0%,
    #eeeeee 92.8571%,
    transparent 0%
  ) !important;
  background-size: 100% 28rpx;
  position: relative !important;
}
.sk-text-14-2857-179 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-0-0000-510 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 24rpx;
  position: relative !important;
}
.sk-text-14-2857-10 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-664 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-804 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-227 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-394 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-947 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-0-0000-220 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 28rpx;
  position: relative !important;
}
.sk-text-25-0000-704 {
  background-image: linear-gradient(
    transparent 25%,
    #eeeeee 0%,
    #eeeeee 75%,
    transparent 0%
  ) !important;
  background-size: 100% 52rpx;
  position: relative !important;
}
.sk-text-25-0000-42 {
  background-image: linear-gradient(
    transparent 25%,
    #eeeeee 0%,
    #eeeeee 75%,
    transparent 0%
  ) !important;
  background-size: 100% 52rpx;
  position: relative !important;
}
.sk-text-31-9444-4 {
  background-image: linear-gradient(
    transparent 31.9444%,
    #eeeeee 0%,
    #eeeeee 68.0556%,
    transparent 0%
  ) !important;
  background-size: 100% 72rpx;
  position: relative !important;
}
.sk-text-31-9444-909 {
  background-image: linear-gradient(
    transparent 31.9444%,
    #eeeeee 0%,
    #eeeeee 68.0556%,
    transparent 0%
  ) !important;
  background-size: 100% 72rpx;
  position: relative !important;
}
.sk-button {
  color: #efefef !important;
  background: #efefef !important;
  border: none !important;
  box-shadow: none !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
