<script lang="ts" setup>
import { OrderState, orderStateList } from '@/services/constants'
import { getMemberOrderApi } from '@/services/order'
import { OrderItem, OrderListParams, OrderListResult } from '@/types/order'
import { computed, onMounted, ref } from 'vue'
import { getPayMockApi, getPayWxPayMiniPayApi } from '@/services/pay'
import { mapState, useStore } from 'vuex' //引入mapState
import { useSafeAreaBottom } from '@/composables'
import { RootState } from '@/store'
//安全距离
const bottom = useSafeAreaBottom()

const props = defineProps<{
  orderState: number
}>()
//子组件调用父组件方法
const emit = defineEmits<{
  (event: 'slideTo', state: Number): void
}>()

//请求参数
const queryParams: Required<OrderListParams> = {
  page: 1,
  pageSize: 5,
  orderState: props.orderState,
}
const loaded = ref(false)
let pages: number = 0

// 定义一个响应式变量来跟踪加载状态
const isLoading = ref(false)
// 定义一个刷新状态
const refreshing = ref(false)
let loadingPromise: Promise<void> | null = null
let currentPromiseId = 0

// 获取订单列表数据
const getMemberOrderData = async (cb: (res: OrderListResult) => void): Promise<void> => {
  if (loadingPromise) {
    return loadingPromise
  }
  var id = ++currentPromiseId
  // 设置加载状态
  isLoading.value = true
  loadingPromise = new Promise((resolve) => {
    getMemberOrderApi(queryParams)
      .then((res) => {
        if (id !== currentPromiseId) {
          return
        }
        // 使用 then 处理 Promise
        cb(res.result)
        pages = res.result.pages
        queryParams.page++
        if (queryParams.page > pages) {
          loaded.value = true
        }
        console.log(res.result)
      })
      .finally(() => {
        console.log('finally', id, '-', currentPromiseId)
        if (id === currentPromiseId) {
          // 重置加载状态
          isLoading.value = false
          loadingPromise = null // 重置 loadingPromise
          resolve() // 确保 Promise 被解决
        }
      })
  })
  return loadingPromise // 返回当前的 Promise
}

//滚动到底部加载更多
const onScrollToLower = async () => {
  if (loaded.value) {
    return
  }
  await getMemberOrderData(setStoreOrderList)
}
//支付订单
const onOrderPay = async (order: OrderItem) => {
  var res
  //TODO:支付业务
  //开发环境
  // if (import.meta.env.DEV) {
  //   res = await getPayMockApi({ orderId: id })
  // } else {
  //   //生产环境
  //   res = await getPayWxPayMiniPayApi({ orderId: id })
  // }
  //关闭跳转页跳转支付成功页
  uni.showToast({
    title: '支付成功',
    icon: 'success',
  })
  //更新订单状态
  store.dispatch('order/triggerPay', { id: order.id, orderState: order.orderState })
  emit('slideTo', props.orderState)
  //关闭跳转页跳转支付成功页
  uni.navigateTo({ url: `/pagesOrder/payment/payment?id=${order.id}` })
}
//确认收货
const onOrderConfirm = async (order: OrderItem) => {
  //TODO:确认收货业务
  uni.showToast({
    title: '确认收货成功',
    icon: 'success',
  })
  //更新订单状态
  store.dispatch('order/triggerConfirm', { id: order.id, orderState: order.orderState })
  emit('slideTo', props.orderState)
}
//评价订单
const onOrderEvaluate = async (order: OrderItem) => {
  //TODO:评价订单业务
  uni.showToast({
    title: '评价成功',
    icon: 'success',
  })
  //更新订单状态
  store.dispatch('order/triggerEvaluate', { id: order.id, orderState: order.orderState })
  emit('slideTo', props.orderState)
}
//删除订单
const onOrderDelete = async (order: OrderItem) => {
  //TODO:删除订单业务
  uni.showToast({
    title: '删除成功',
    icon: 'success',
  })
  store.dispatch('order/triggerDelete', { id: order.id, orderState: order.orderState })
}
//下拉刷新，如果当前有正在加载的任务，则取消该Promise
const onRefresherrefresh = async () => {
  refreshing.value = true // 开始下拉刷新状态
  queryParams.page = 1 // 重置页码
  if (loadingPromise) {
    loadingPromise = null // 取消当前的 Promise
  }
  console.log('下拉刷新', import.meta.env.VITE_APP_API_TIMEOUT)
  await getMemberOrderData(refreshStoreOrderList).finally(() => {
    refreshing.value = false // 下拉刷新结束
  })
}
//vuex state
const store = useStore<RootState>()
const orderList = computed<OrderItem[]>(() => store.getters['order/getData'][props.orderState])

const refreshStoreOrderList = (res: OrderListResult) => {
  store.dispatch('order/triggerRefresh', { orderList: res.items, orderState: props.orderState })
}
const setStoreOrderList = (res: OrderListResult) => {
  store.commit('order/SET_DATA', {
    orderList: res.items,
    orderState: props.orderState,
  })
}
onMounted(() => {
  getMemberOrderData(setStoreOrderList)
})
</script>
<template>
  <!-- 订单列表 -->
  <scroll-view
    scroll-y
    class="orders"
    :enable-flex="true"
    refresher-enabled
    :refresher-triggered="refreshing"
    :style="{ paddingBottom: bottom + 'px' }"
    @scrolltolower="onScrollToLower"
    @refresherrefresh="onRefresherrefresh"
  >
    <view v-for="order in orderList" :key="order.id" class="card">
      <!-- 订单信息 -->
      <view class="status">
        <text class="date">{{ order.createTime }}</text>
        <!-- 订单状态文字 -->
        <text>{{ orderStateList[order.orderState].text }}</text>
        <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
        <text
          v-if="order.orderState >= OrderState.DaiPingJia"
          class="icon-delete"
          @tap="onOrderDelete(order)"
        ></text>
      </view>
      <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
      <navigator
        v-for="sku in order.skus"
        :key="sku.id"
        class="goods"
        :url="`/pagesOrder/detail/detail?id=${order.id}`"
        hover-class="none"
      >
        <view class="cover">
          <image class="image" mode="aspectFit" :src="sku.image"></image>
        </view>
        <view class="meta">
          <view class="name ellipsis">{{ sku.name }}</view>
          <view class="type">{{ sku.attrsText }}</view>
        </view>
      </navigator>
      <!-- 支付信息 -->
      <view class="payment">
        <text class="quantity">共{{ order.totalNum }}件商品</text>
        <text>实付</text>
        <text class="amount"> <text class="symbol">¥</text>{{ order.payMoney }}</text>
      </view>
      <!-- 订单操作按钮 -->
      <view class="action">
        <!-- 待付款状态：显示去支付按钮 -->
        <template v-if="order.orderState === OrderState.DaiFuKuan">
          <view class="button primary" @tap="onOrderPay(order)">去支付</view>
        </template>
        <template v-else>
          <navigator
            class="button secondary"
            :url="`/pagesOrder/create/create?orderId=${order.id}`"
            hover-class="none"
          >
            再次购买
          </navigator>
          <!-- 待发货状态: 展示查看物流按钮 -->
          <navigator
            v-if="order.orderState === OrderState.DaiFaHuo"
            class="button primary"
            :url="`/pagesOrder/detail/detail?id=${order.id}`"
            hover-class="none"
          >
            查看物流
          </navigator>
          <!-- 待收货状态: 展示确认收货 -->
          <view
            v-if="order.orderState === OrderState.DaiShouHuo"
            class="button primary"
            @tap="onOrderConfirm(order)"
            >确认收货</view
          >
          <!-- 待评价状态: 展示评价按钮 -->
          <view
            v-else-if="order.orderState === OrderState.DaiPingJia"
            class="button primary"
            @tap="onOrderEvaluate(order)"
            >评价</view
          >
        </template>
      </view>
    </view>
    <!-- 底部提示文字 -->
    <view class="loading-text">
      {{ loaded ? '没有更多数据~' : '正在加载...' }}
    </view>
  </scroll-view>
</template>
<style lang="scss">
.primary {
  background-color: #ff9240;
  color: #fff;
  border-radius: 10rpx;
  padding: 10rpx 20rpx;
  margin-top: 20rpx;
}
// 订单列表
.orders {
  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    &:last-child {
      padding-bottom: 40rpx;
    }
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #999;
    margin-bottom: 15rpx;

    .date {
      color: #666;
      flex: 1;
    }

    .primary {
      color: #ff9240;
    }

    .icon-delete {
      line-height: 1;
      margin-left: 10rpx;
      padding-left: 10rpx;
      border-left: 1rpx solid #e3e3e3;
    }
  }
  .goods {
    display: flex;
    margin-bottom: 20rpx;
    .cover {
      display: flex;
      width: 170rpx;
      height: 170rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      position: relative;
      .image {
        width: 100%;
        height: 100%;
      }
    }
    .quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      line-height: 1;
      padding: 6rpx 4rpx 6rpx 8rpx;
      font-size: 24rpx;
      color: #fff;
      border-radius: 10rpx 0 0 0;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .navigator-wrap {
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .type {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 10rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .more {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22rpx;
      color: #333;
    }
  }
  .payment {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 1;
    padding: 20rpx 0;
    text-align: right;
    color: #999;
    font-size: 28rpx;
    border-bottom: 1rpx solid #eee;

    .quantity {
      font-size: 24rpx;
      margin-right: 16rpx;
    }

    .amount {
      color: #444;
      margin-left: 6rpx;
    }

    .symbol {
      font-size: 20rpx;
    }
  }
  .action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 20rpx;

    .button {
      width: 180rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20rpx;
      border-radius: 60rpx;
      border: 1rpx solid #ccc;
      font-size: 26rpx;
      color: #444;
    }

    .secondary {
      color: #27ba9b;
      border-color: #27ba9b;
    }

    .primary {
      color: #fff;
      background-color: #27ba9b;
    }
  }
  .loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }
}
</style>
