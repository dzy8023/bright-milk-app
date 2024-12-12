import type { GMmkGuessInstance } from '@/types/components'
import { ref } from 'vue'

//猜你喜欢组合式函数
export const useGuessList = () => {
  //获取猜你喜欢组件实例
  const guessRef = ref<GMmkGuessInstance>()
  //滚动触底触发的函数
  const onScrollToLower = () => {
    guessRef.value?.getMore()
  }
  //返回ref和事件处理函数
  return { guessRef, onScrollToLower }
}
//安全距离
export const useSafeAreaBottom = () => {
  let bottom: number = 0
  // 获取屏幕边界到安全区域距离
  /* #ifdef MP-WEIXIN */
  const safeArea = wx.getWindowInfo()
  bottom = safeArea?.screenHeight - safeArea?.safeArea.bottom
  /* #endif */
  /* #ifndef MP-WEIXIN*/
  const { safeAreaInsets } = uni.getSystemInfoSync()
  bottom = safeAreaInsets?.bottom || 0
  /* #endif */
  return bottom
}

export const useSafeAreaTop = () => {
  let top: number = 0
  /* #ifdef MP-WEIXIN */
  top = wx.getWindowInfo().statusBarHeight
  /* #endif */
  /* #ifndef MP-WEIXIN*/
  const { safeAreaInsets } = uni.getSystemInfoSync()
  top = safeAreaInsets?.top || 0
  /* #endif */
  return top
}
