<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { useSafeAreaBottom } from '@/composables'
import { OrderPreResult } from '@/types/order'
import { useAddressStore } from '@/stores/modules/adderss'
import {
  getMemberOrderRepurchaseByIdApi,
  getMemebrOrderPreApi,
  getMemebrOrderPreNowApi,
  postMemberOrderApi,
} from '@/services/order'
//安全距离
const bottom = useSafeAreaBottom()
const query = defineProps<{
  skuId?: string
  count?: string
  orderId?: string
}>()

// 订单备注
const buyerMessage = ref('')
//配送方式
const postList = ref([
  { type: '1', text: '到店自取' },
  { type: '2', text: '送货上门' },
])
//修改配送方式
const onchangePostType: UniHelper.RadioGroupOnChange = (e: UniHelper.RadioGroupOnChangeEvent) => {
  postType.value = e.detail.value
}
const postType = ref('1')
// 配送时间
const deliveryList = ref([
  { type: 1, text: '上午送 (07:00-08:00)' },
  { type: 2, text: '下午送 (17:30-18:30)' },
  { type: 3, text: '晚上送 (20:00-20:30)' },
])
// 当前配送时间下标
const activeIndex = ref(0)
// 当前配送时间
const activeDelivery = computed(() => deliveryList.value[activeIndex.value])
const orderPreData = ref<OrderPreResult>()
// 修改配送时间
const onChangeDelivery: UniHelper.SelectorPickerOnChange = (ev) => {
  activeIndex.value = ev.detail.value
}
// 收货地址
const addressStore = useAddressStore()
const address = computed(() => {
  return (
    addressStore.selectedAddress || orderPreData.value?.userAddresses.find((item) => item.isDefault)
  )
})
const getMemebrOrderPreData = async () => {
  var res
  if (query.skuId && query.count) {
    //获取立即购买订单数据
    res = await getMemebrOrderPreNowApi({ skuId: query.skuId, count: query.count })
  } else if (query.orderId) {
    res = await getMemberOrderRepurchaseByIdApi(query.orderId)
  } else {
    // 获取预付订单数据
    res = await getMemebrOrderPreApi()
  }
  orderPreData.value = res.result
  console.log(res.result)
}
const onSubmitOrder = async () => {
  if (postType.value === '2' && !address.value?.id) {
    return uni.showToast({
      title: '请选择收货地址',
      icon: 'none',
    })
  }
  uni.showLoading({
    title: '提交订单中',
    mask: true,
  })
  setTimeout(async () => {
    const res = await postMemberOrderApi({
      addressId: address.value?.id,
      note: buyerMessage.value,
      postType: Number(postType.value),
      goods: orderPreData.value!.goods.map((v) => ({ count: v.quantity, skuId: v.skuId })),
    })
    uni.hideLoading()
    console.log(res.result)
    // 跳转到订单详情页
    uni.redirectTo({ url: `/pagesOrder/detail/detail?id=${res.result.id}` })
  }, 2000)
}
const onInput = (e: any) => {
  buyerMessage.value = e
  console.log(e)
}
onLoad(() => {
  getMemebrOrderPreData()
})
</script>

<template>
  <scroll-view scroll-y class="viewport" :style="{ paddingBottom: bottom + 'px' }">
    <!-- 配送方式 -->
    <view class="post-type">
      <text class="text">配送方式</text>
      <radio-group class="radio-group" @change="onchangePostType">
        <label
          v-for="item in postList"
          :key="item.type"
          class="label"
          :class="{ active: item.type === postType }"
        >
          <radio :value="item.type" color="#27ba9b" :checked="postType === item.type" />
          {{ item.text }}
        </label>
      </radio-group>
    </view>
    <template v-if="postType === '2'">
      <!-- 收货地址 -->
      <navigator
        v-if="address"
        class="shipment"
        hover-class="none"
        url="/pagesMember/address/address?from=order"
      >
        <view class="user"> {{ address.name + ' | ' + address.phone }} </view>
        <view class="address">{{ address.address }} </view>
        <text class="icon icon-right"></text>
      </navigator>
      <navigator
        v-else
        class="shipment"
        hover-class="none"
        url="/pagesMember/address/address?from=order"
      >
        <view class="address"> 请选择收货地址 </view>
        <text class="icon icon-right"></text>
      </navigator>
    </template>

    <!-- 商品信息 -->
    <view class="goods">
      <navigator
        v-for="item in orderPreData?.goods"
        :key="item.skuId"
        :url="`/pages/goods/goods?id=${item.id}`"
        class="item"
        hover-class="none"
      >
        <image class="picture" :src="item.image" />
        <view class="meta">
          <view class="name ellipsis"> {{ item.name }} </view>
          <view class="attrs">{{ item.attrsText }}</view>
          <view class="prices">
            <view class="pay-price symbol">{{
              item.payPrice ? item.payPrice.toFixed(2) : (item.price - item.discount).toFixed(2)
            }}</view>
            <view class="price symbol">{{ item.price.toFixed(2) }}</view>
          </view>
          <view class="count">x{{ item.quantity }}</view>
        </view>
      </navigator>
    </view>

    <!-- 配送及支付方式 -->
    <view class="related">
      <view class="item">
        <text class="text">配送时间</text>
        <picker class="ipicker" :range="deliveryList" range-key="text" @change="onChangeDelivery">
          <view class="icon-fonts picker">{{ activeDelivery.text }}</view>
        </picker>
      </view>
      <view class="item row">
        <text class="text">订单备注</text>
        <fuck-textarea
          :border="false"
          class="text-area"
          placeholder="选填，建议留言前先与商家沟通确认"
          maxlength="100"
          @input="onInput"
        ></fuck-textarea>
      </view>
    </view>

    <!-- 支付金额 -->
    <view class="settlement">
      <view class="item">
        <text class="text">商品总价: </text>
        <text class="number symbol">{{ orderPreData?.summary.totalPrice.toFixed(2) }}</text>
      </view>
      <view class="item">
        <text class="text">运费: </text>
        <text class="number symbol">{{ orderPreData?.summary.postFee.toFixed(2) }}</text>
      </view>
    </view>
    <!-- 底部占位空盒子 -->
    <view class="toolbar-height"></view>
  </scroll-view>

  <!-- 吸底工具栏 -->
  <view class="toolbar" :style="{ paddingBottom: bottom + 'px' }">
    <view class="total-pay symbol">
      <text class="number">{{ orderPreData?.summary.totalPayPrice.toFixed(2) }}</text>
    </view>
    <view
      class="button"
      :class="{ disabled: postType === '2' && !address?.id }"
      @tap="onSubmitOrder"
    >
      提交订单
    </view>
  </view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}

.symbol::before {
  content: '¥';
  font-size: 80%;
  margin-right: 5rpx;
}

.shipment {
  margin: 20rpx;
  padding: 30rpx 30rpx 30rpx 84rpx;
  font-size: 26rpx;
  border-radius: 10rpx;
  background: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png)
    20rpx center / 50rpx no-repeat #fff;
  position: relative;

  .icon {
    font-size: 36rpx;
    color: #333;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 20rpx;
  }

  .user {
    color: #333;
    margin-bottom: 5rpx;
  }

  .address {
    color: #666;
  }
}

.goods {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    padding: 30rpx 0;
    border-top: 1rpx solid #eee;

    &:first-child {
      border-top: none;
    }

    .picture {
      width: 170rpx;
      height: 170rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .attrs {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 6rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .prices {
      display: flex;
      align-items: baseline;
      margin-top: 6rpx;
      font-size: 28rpx;

      .pay-price {
        margin-right: 10rpx;
        color: #cf4444;
      }

      .price {
        font-size: 24rpx;
        color: #999;
        text-decoration: line-through;
      }
    }

    .count {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 26rpx;
      color: #444;
    }
  }
}
.post-type {
  margin: 20rpx;
  padding: 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  font-size: 26rpx;
  .text {
    display: flex;
    margin-bottom: 10rpx;
  }
  .radio-group {
    display: flex;
    flex-wrap: wrap;
  }
  .label {
    margin-right: 20rpx;
    color: #333;
  }
  .active {
    color: #27ba9b;
  }
}
.related {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    width: 100%;
    display: flex;
    align-items: center;
    min-height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }

  .input {
    flex: 1;
    text-align: right;
    margin: 20rpx 0;
    padding-right: 20rpx;
    font-size: 26rpx;
    color: #999;
  }
  .row {
    flex-direction: column;
    align-items: flex-start;
  }
  .item .text {
    width: 125rpx;
  }
  .item .text-area {
    // box-sizing: border-box; /* 确保内边距和边框包含在总宽度中 */
    margin: 20rpx 0;
    border-radius: 10rpx;
    padding: 10rpx;
    width: 97%;
    background-color: #f4f4f4;
    font-size: 26rpx;
  }
  .ipicker {
    margin-left: auto;
  }
  .picker {
    color: #666;
  }

  .picker::after {
    content: '\e6c2';
  }
}

/* 结算清单 */
.settlement {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }

  .danger {
    color: #cf4444;
  }
}

/* 吸底工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;

  .total-pay {
    font-size: 40rpx;
    color: #cf4444;

    .decimal {
      font-size: 75%;
    }
  }

  .button {
    width: 220rpx;
    text-align: center;
    line-height: 72rpx;
    font-size: 26rpx;
    color: #fff;
    border-radius: 72rpx;
    background-color: #27ba9b;
  }

  .disabled {
    opacity: 0.6;
  }
}
// 底部占位空盒子
.toolbar-height {
  height: 100rpx;
}
</style>
