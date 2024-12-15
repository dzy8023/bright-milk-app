<script setup lang="ts">
import { useGuessList } from '@/composables'

import { onLoad, onReady, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
// import PageSkeleton from './components/PageSkeleton.vue'
import { useSafeAreaBottom } from '@/composables'
import type { OrderLogisticResult, OrderResult } from '@/types/order'
import {
  deleteMemberOrderApi,
  getMemberOrderByIdApi,
  getMemberOrderCancelByIdApi,
  getMemberOrderConsignmentByIdApi,
  getMemberOrderLogisticsByIdApi,
  putMemberOrderReceiptByIdApi,
} from '@/services/order'
import { OrderState, orderStateList } from '@/services/constants'
import { getPayMockApi, getPayWxPayMiniPayApi } from '@/services/pay'
import PageSkeleton from './components/PageSkeleton.vue'
//安全距离
const bottom = useSafeAreaBottom()
let top = 0,
  top2 = 0
/* #ifdef MP-WEIXIN */
top = wx.getWindowInfo().safeArea.top
/* #endif */
/* #ifndef MP-WEIXIN */
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
top = safeAreaInsets?.top || 0
/* #endif */
/* #ifdef APP-PLUS */
top2 = top
/* #endif */
/* #ifndef APP-PLUS */
top2 = top + 10
/* #endif */

const isDev = import.meta.env.DEV
// 猜你喜欢
const { guessRef, onScrollToLower } = useGuessList()
// 弹出层组件
const popup = ref<UniHelper.UniPopupInstance>()
// 取消原因列表
const reasonList = ref([
  '商品无货',
  '不想要了',
  '商品信息填错了',
  '地址信息填写错误',
  '商品降价',
  '其它',
])
// 订单取消原因
const reason = ref('')
// 复制内容
const onCopy = (id: string) => {
  // 设置系统剪贴板的内容
  uni.setClipboardData({ data: id })
}
// 获取页面参数
const query = defineProps<{
  id: string
}>()
//获取页面栈
const pages = getCurrentPages()
const order = ref<OrderResult>()
const orderLogisticData = ref<OrderLogisticResult>()

//获取订单详情
const getMemberOrderByIdData = async () => {
  const res = await getMemberOrderByIdApi(query.id)
  order.value = res.result
  if (
    [OrderState.DaiPingJia, OrderState.YiWanCheng, OrderState.DaiShouHuo].includes(
      order.value!.status,
    )
  ) {
    getMemberOrderLogisticsByIdData()
  }
}
//倒计时结束
const onTimeUp = () => {
  //修改订单状态为已取消
  order.value!.status = OrderState.YiQuXiao
}
//支付订单
const onOrderPay = async () => {
  var res
  //开发环境
  if (isDev) {
    res = await getPayMockApi({ orderId: query.id })
  } else {
    //生产环境
    res = await getPayWxPayMiniPayApi({ orderId: query.id })
  }
  console.log(res.result)
  //关闭跳转页跳转支付成功页
  uni.redirectTo({ url: `/pagesOrder/payment/payment?id=${query.id}` })
}
//模拟发货
const onOrderSend = async () => {
  if (isDev) {
    await getMemberOrderConsignmentByIdApi(query.id)
    uni.showToast({ title: '模拟发货成功', icon: 'success' })
    order.value!.status = OrderState.DaiShouHuo
  }
}
//确认收货
const onOrderConfirm = async () => {
  //修改订单状态为已收货
  uni.showModal({
    title: '确认收货',
    content: '为保障您的权益，请收到货并确认无误后，再确认收货',
    success: async (res) => {
      if (res.confirm) {
        const res = await putMemberOrderReceiptByIdApi(query.id)
        order.value = res.result
        uni.showToast({ title: '确认收货成功', icon: 'none' })
      }
    },
  })
}
//订单取消
const onOrderCancel = async () => {
  //弹出取消订单弹窗
  uni.showModal({
    title: '取消订单',
    content: '确认要取消该订单吗？',
    success: async (res) => {
      if (res.confirm) {
        await getMemberOrderCancelByIdApi(query.id, { cancelReason: reason.value })
        //修改订单状态为已取消
        order.value!.status = OrderState.YiQuXiao
      }
    },
  })
}
//获取物流信息
const getMemberOrderLogisticsByIdData = async () => {
  //模拟获取物流信息
  const res = await getMemberOrderLogisticsByIdApi(query.id)
  orderLogisticData.value = res.result
  console.log(res.result)
}
const onOrderDelete = async () => {
  uni.showModal({
    title: '删除订单',
    content: '确认要删除该订单吗？',
    success: async (res) => {
      if (res.confirm) {
        await deleteMemberOrderApi({ ids: [query.id] })
        //跳转到订单列表页
        uni.redirectTo({ url: '/pagesOrder/list/list' })
      }
    },
  })
}
/* #ifndef MP-WEIXIN */
//动画效果
const onScroller: UniHelper.ScrollViewOnScroll = (e) => {
  const scrollTop = e.detail.scrollTop
  const navbar = document.querySelector('.navbar') as HTMLElement
  const title = document.querySelector('.navbar .title') as HTMLElement // 获取标题元素
  const backButton = document.querySelector('.navbar .back') as HTMLElement // 获取返回按钮元素
  if (navbar && 0 <= scrollTop && scrollTop <= 100) {
    // 计算背景颜色的变化比例
    const maxScroll = 80 // 最大滚动距离
    const ratio = Math.min(scrollTop / maxScroll, 1) // 计算比例，最大值为1
    const rratio = 1 - ratio // 计算反比例，最大值为0
    // 根据比例计算颜色
    navbar.style.backgroundColor = `rgba(248, 248, 248, ${ratio})` // 动态设置背景颜色
    // 根据比例设置标题颜色
    const titleColor = `rgba(0, 0, 0, ${ratio})` // 从透明到黑色
    // 动态设置返回按钮颜色
    const backButtonColor = `rgba(${255 * rratio}, ${255 * rratio}, ${255 * rratio})` // 从白色到黑色
    if (title) {
      title.style.color = titleColor // 设置标题颜色
    }
    if (backButton) {
      backButton.style.color = backButtonColor // 设置返回按钮颜色
    }
  }
}
/* #endif */

/* #ifdef MP-WEIXIN */
//页面渲染完毕，再实现动画
onReady(() => {
  //获取当前页面实例
  const pageInstance = pages.at(-1) as any
  //动画效果
  pageInstance.animate(
    '.navbar',
    [{ backgroundColor: 'transparent' }, { backgroundColor: '#f8f8f8' }],
    1000,
    {
      scrollSource: '#scroller',
      timeRange: 1000,
      startScrollOffset: 0,
      endScrollOffset: 80,
    },
  )
  pageInstance.animate('.navbar .title', [{ color: 'transparent' }, { color: '#000' }], 1000, {
    scrollSource: '#scroller',
    timeRange: 1000,
    startScrollOffset: 0,
    endScrollOffset: 80,
  })
  pageInstance.animate('.navbar .back', [{ color: '#fff' }, { color: '#000' }], 1000, {
    scrollSource: '#scroller',
    timeRange: 1000,
    startScrollOffset: 0,
    endScrollOffset: 80,
  })
})
/* #endif */

onLoad(() => {
  getMemberOrderByIdData()
})
</script>

<template>
  <!-- 自定义导航栏: 默认透明不可见, scroll-view 滚动到 50 时展示 -->
  <view class="navbar" :style="{ paddingTop: top + 'px' }">
    <view class="wrap">
      <navigator
        v-if="pages.length > 1"
        open-type="navigateBack"
        class="back icon-left"
      ></navigator>
      <navigator v-else url="/pages/index/index" open-type="switchTab" class="back icon-home">
      </navigator>
      <view class="title">订单详情</view>
    </view>
  </view>
  <scroll-view
    id="scroller"
    scroll-y
    class="viewport"
    @scroll="onScroller"
    @scrolltolower="onScrollToLower"
  >
    <template v-if="order">
      <!-- 订单状态 -->
      <view class="overview" :style="{ paddingTop: top2 + 'px' }">
        <!-- 待付款状态:展示去支付按钮和倒计时 -->
        <template v-if="order?.status === OrderState.DaiFuKuan">
          <view class="status icon-clock">等待付款</view>
          <view class="tips">
            <text class="money">应付金额: ¥ {{ order.payMoney.toFixed(2) }}</text>
            <text class="time">支付剩余</text>
            <uni-countdown
              :second="order.countdown"
              color="#fff"
              :show-day="false"
              :show-colon="false"
              splitor-color="#fff"
              @timeup="onTimeUp"
            />
          </view>
          <view class="button" @tap="onOrderPay">去支付</view>
        </template>
        <!-- 其他订单状态:展示再次购买按钮 -->
        <template v-else>
          <!-- 订单状态文字 -->
          <view class="status"> {{ orderStateList[order.status].text }} </view>
          <view class="button-group">
            <navigator
              class="button"
              :url="`/pagesOrder/create/create?orderId=${query.id}`"
              hover-class="none"
            >
              再次购买
            </navigator>
            <!-- 待发货状态：模拟发货,开发期间使用,用于修改订单状态为已发货 -->
            <view
              v-if="isDev && order.status === OrderState.DaiFaHuo"
              class="button"
              @tap="onOrderSend"
            >
              模拟发货</view
            >
            <!-- 待收货状态：展示确认收货按钮 -->
            <view
              v-else-if="order.status === OrderState.DaiShouHuo"
              class="button"
              @tap="onOrderConfirm"
            >
              确认收货
            </view>
          </view>
        </template>
      </view>
      <!-- 订单发送状态 -->
      <view class="shipment">
        <!-- 订单物流信息 -->
        <view v-for="item in orderLogisticData?.list" :key="item.id" class="item">
          <view class="message">
            {{ item.text }}
          </view>
          <view class="date"> {{ item.time }} </view>
        </view>
        <!-- 用户收货地址 -->
        <view class="locate">
          <view class="user">{{ order.userAddress?.name + ' ' + order.userAddress?.phone }} </view>
          <view class="address"> {{ order.userAddress?.address }} </view>
        </view>
      </view>

      <!-- 商品信息 -->
      <view class="goods">
        <view class="item">
          <navigator
            v-for="item in order.skus"
            :key="item.id"
            class="navigator"
            :url="`/pages/goods/goods?id=${item.spuId}`"
            hover-class="none"
          >
            <image class="cover" :src="item.image"></image>
            <view class="meta">
              <view class="name ellipsis">{{ item.name }}</view>
              <view class="type">{{ item.attrsText }}</view>
              <view class="prices">
                <view class="pay-price symbol">{{
                  item.price ? item.price.toFixed(2) : (item.price - item.discount).toFixed(2)
                }}</view>
                <view class="price symbol">{{ item.price.toFixed(2) }}</view>
              </view>
              <!-- <view class="price">
                <view class="actual">
                  <text class="symbol">¥</text>
                  <text>{{ item.price.toFixed(2) }}</text>
                </view>
              </view> -->
              <view class="quantity">x{{ item.quantity }}</view>
            </view>
          </navigator>
          <!-- 待评价状态:展示按钮 -->
          <view v-if="order.status === OrderState.DaiPingJia" class="action">
            <view class="button primary">申请售后</view>
            <navigator url="" class="button"> 去评价 </navigator>
          </view>
        </view>
        <!-- 合计 -->
        <view class="total">
          <view class="row">
            <view class="text">商品总价: </view>
            <view class="symbol">{{ order.totalAmount.toFixed(2) }}</view>
          </view>
          <view class="row">
            <view class="text">运费: </view>
            <view class="symbol">{{ order.postFee?.toFixed(2) }}</view>
          </view>
          <view class="row">
            <view class="text">商品折扣: </view>
            <text class="sub-text">-&nbsp;</text>
            <view class="symbol">{{ order.discountAmount?.toFixed(2) }}</view>
          </view>
          <view class="row">
            <view class="text">应付金额: </view>
            <view class="symbol primary">{{ order.payMoney.toFixed(2) }}</view>
          </view>
        </view>
      </view>

      <!-- 订单信息 -->
      <view class="detail">
        <view class="title">订单信息</view>
        <view class="row">
          <view class="item">
            订单编号: {{ query.id }} <text class="copy" @tap="onCopy(query.id)">复制</text>
          </view>
          <view class="item">下单时间: {{ order.createTime }}</view>
        </view>
      </view>

      <!-- 猜你喜欢 -->
      <GMmkGuess ref="guessRef" />

      <!-- 底部操作栏 -->
      <view class="toolbar-height" :style="{ paddingBottom: bottom + 'px' }"></view>
      <view class="toolbar" :style="{ paddingBottom: bottom + 'px' }">
        <!-- 待付款状态:展示支付按钮 -->
        <template v-if="order?.status === OrderState.DaiFuKuan">
          <view class="button primary" @tap="onOrderPay"> 去支付 </view>
          <view class="button" @tap="popup?.open?.()"> 取消订单 </view>
        </template>
        <!-- 其他订单状态:按需展示按钮 -->
        <template v-else>
          <navigator
            class="button secondary"
            :url="`/pagesOrder/create/create?orderId=${query.id}`"
            hover-class="none"
          >
            再次购买
          </navigator>
          <!-- 待收货状态：展示确认收货按钮 -->
          <view v-if="order.status === OrderState.DaiShouHuo" class="button" @tap="onOrderConfirm">
            确认收货
          </view>
          <!-- 待评价状态: 展示去评价 -->
          <view v-if="order.status === OrderState.DaiPingJia" class="button"> 去评价 </view>
          <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
          <view
            v-if="order.status >= OrderState.DaiPingJia"
            class="button delete"
            @tap="onOrderDelete"
          >
            删除订单
          </view>
        </template>
      </view>
    </template>
    <template v-else>
      <!-- 骨架屏组件 -->
      <PageSkeleton />
    </template>
  </scroll-view>
  <!-- 取消订单弹窗 -->
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <view class="popup-root">
      <view class="title">订单取消</view>
      <view class="description">
        <view class="tips">请选择取消订单的原因：</view>
        <view v-for="item in reasonList" :key="item" class="cell" @tap="reason = item">
          <text class="text">{{ item }}</text>
          <text class="icon" :class="{ checked: item === reason }"></text>
        </view>
      </view>
      <view class="footer">
        <view class="button" @tap="popup?.close?.()">取消</view>
        <view class="button primary" @tap="onOrderCancel">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<style lang="scss">
@use './styles/detail.scss';
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.navigator {
  .navigator-wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
}
</style>
