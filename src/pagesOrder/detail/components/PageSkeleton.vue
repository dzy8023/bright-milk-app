<template name="skeleton">
  <view class="sk-container">
    <view class="navbar navbar" style="padding-top: 44px">
      <view class="wrap wrap">
        <navigator
          class="back icon-home sk-pseudo sk-pseudo-circle"
          open-type="switchTab"
        ></navigator>
        <view class="title sk-transparent sk-text-14-2857-598 sk-text">订单详情</view>
      </view>
    </view>
    <scroll-view
      id="scroller"
      :scroll-y="true"
      class="viewport viewport"
      :enable-back-to-top="true"
    >
      <view class="overview sk-image" style="padding-top: 54px">
        <view class="status sk-transparent sk-text-0-0000-705 sk-text">已完成</view>
        <view class="button-group button-group">
          <navigator
            class="button sk-transparent sk-text-28-1250-606 sk-text"
            hover-class="none"
            style="background-position-x: 50%"
          >
            再次购买
          </navigator>
        </view>
      </view>
      <view class="shipment shipment">
        <view class="locate sk-image">
          <view class="user sk-transparent sk-text-14-2857-584 sk-text">郗国秀 037 2944 0334</view>
          <view class="address sk-transparent sk-text-14-2857-576 sk-text"
            >黑龙江省 衡徽市 宜丰县 敛栋297号 5号房间</view
          >
        </view>
      </view>
      <view class="goods goods">
        <view class="item item">
          <navigator class="navigator navigator" hover-class="none">
            <image class="cover sk-image"></image>
            <view class="meta meta">
              <view class="name ellipsis sk-transparent sk-text-14-2857-930 sk-text"
                >电子的新鲜肥皂</view
              >
              <view class="type sk-transparent sk-text-22-2222-701 sk-text">钢</view>
              <view class="prices prices">
                <view
                  class="pay-price symbol sk-transparent sk-text-14-2857-504 sk-text sk-pseudo sk-pseudo-circle"
                  >83.78</view
                >
                <view
                  class="price symbol sk-transparent sk-text-14-2857-17 sk-text sk-pseudo sk-pseudo-circle"
                  style="text-decoration-color: transparent"
                  >83.78</view
                >
              </view>
              <view class="quantity sk-transparent sk-text-14-2857-307 sk-text">x74</view>
            </view>
          </navigator>
          <navigator class="navigator navigator" hover-class="none">
            <image class="cover sk-image"></image>
            <view class="meta meta">
              <view class="name ellipsis sk-transparent sk-text-14-2857-841 sk-text"
                >手工制作的新鲜沙拉</view
              >
              <view class="type sk-transparent sk-text-22-2222-546 sk-text">冷冻</view>
              <view class="prices prices">
                <view
                  class="pay-price symbol sk-transparent sk-text-14-2857-430 sk-text sk-pseudo sk-pseudo-circle"
                  >44.40</view
                >
                <view
                  class="price symbol sk-transparent sk-text-14-2857-850 sk-text sk-pseudo sk-pseudo-circle"
                  style="text-decoration-color: transparent"
                  >44.40</view
                >
              </view>
              <view class="quantity sk-transparent sk-text-14-2857-560 sk-text">x69</view>
            </view>
          </navigator>
        </view>
        <view class="total total">
          <view class="row row">
            <view class="text sk-transparent sk-text-0-0000-282 sk-text">商品总价: </view>
            <view
              class="symbol sk-transparent sk-text-0-0000-450 sk-text sk-pseudo sk-pseudo-circle"
              >716.83</view
            >
          </view>
          <view class="row row">
            <view class="text sk-transparent sk-text-0-0000-575 sk-text">运费: </view>
            <view
              class="symbol sk-transparent sk-text-0-0000-593 sk-text sk-pseudo sk-pseudo-circle"
              >2.68</view
            >
          </view>
          <view class="row row">
            <view class="text sk-transparent sk-text-0-0000-824 sk-text">商品折扣: </view>
            <text class="sub-text sk-transparent sk-opacity">-&nbsp;</text>
            <view
              class="symbol sk-transparent sk-text-0-0000-309 sk-text sk-pseudo sk-pseudo-circle"
              >12.43</view
            >
          </view>
          <view class="row row">
            <view class="text sk-transparent sk-text-0-0000-943 sk-text">应付金额: </view>
            <view
              class="symbol primary sk-transparent sk-text-0-0000-112 sk-text sk-pseudo sk-pseudo-circle"
              >0.56</view
            >
          </view>
        </view>
      </view>
      <view class="detail detail">
        <view class="title sk-transparent sk-text-0-0000-194 sk-text">订单信息</view>
        <view class="row row">
          <view class="item sk-transparent">
            订单编号: 647689500746150
            <text class="copy sk-transparent sk-text-0-0000-506 sk-text">复制</text>
          </view>
          <view class="item sk-transparent sk-text-0-0000-34 sk-text"
            >下单时间: 2024-12-15 05:44:37</view
          >
        </view>
      </view>
      <view is="components/GMmkGuess" class="r r">
        <view class="caption GMmkGuess--caption">
          <text
            class="text GMmkGuess--text sk-transparent sk-text-0-0000-475 sk-text sk-pseudo sk-pseudo-circle"
            >猜你喜欢</text
          >
        </view>
        <view is="components/GMmkGoodList">
          <view class="content GMmkGoodList--content">
            <navigator class="gl-goods GMmkGoodList--gl-goods">
              <image class="image GMmkGoodList--image sk-image" mode="aspectFill"></image>
            </navigator>
            <navigator class="gl-goods GMmkGoodList--gl-goods">
              <image class="image GMmkGoodList--image sk-image" mode="aspectFill"></image>
            </navigator>
          </view>
        </view>
      </view>
      <view class="toolbar toolbar" style="padding-bottom: 34px">
        <navigator
          class="button secondary sk-transparent sk-text-14-2857-864 sk-text"
          hover-class="none"
        >
          再次购买
        </navigator>
        <view class="button delete sk-transparent sk-text-14-2857-633 sk-text"> 删除订单 </view>
      </view>
    </scroll-view>
  </view>
</template>
<style lang="scss">
@use '../styles/detail.scss';
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-598 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-0-0000-705 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 36rpx;
  position: relative !important;
}
.sk-text-28-1250-606 {
  background-image: linear-gradient(
    transparent 28.125%,
    #eeeeee 0%,
    #eeeeee 71.875%,
    transparent 0%
  ) !important;
  background-size: 100% 64rpx;
  position: relative !important;
}
.sk-text-14-2857-584 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-576 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-930 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-22-2222-701 {
  background-image: linear-gradient(
    transparent 22.2222%,
    #eeeeee 0%,
    #eeeeee 77.7778%,
    transparent 0%
  ) !important;
  background-size: 100% 43.2rpx;
  position: relative !important;
}
.sk-text-14-2857-504 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-17 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-307 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: absolute !important;
}
.sk-text-14-2857-841 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-22-2222-546 {
  background-image: linear-gradient(
    transparent 22.2222%,
    #eeeeee 0%,
    #eeeeee 77.7778%,
    transparent 0%
  ) !important;
  background-size: 100% 43.2rpx;
  position: relative !important;
}
.sk-text-14-2857-430 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-850 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-560 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: absolute !important;
}
.sk-text-0-0000-282 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-450 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-575 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-593 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-824 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-0-0000-309 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-943 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-112 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 36rpx;
  position: relative !important;
}
.sk-text-0-0000-194 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 30rpx;
  position: relative !important;
}
.sk-text-0-0000-506 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 20rpx;
  position: relative !important;
}
.sk-text-0-0000-34 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-475 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 32rpx;
  position: relative !important;
}
.sk-text-14-2857-864 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-633 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
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
