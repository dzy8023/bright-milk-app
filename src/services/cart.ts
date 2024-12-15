import type { CartItem } from '@/types/cart'
import { http } from '@/utils/http'
/**
 * 加入购物车
 * @param data
 * @returns
 */
export const postMemberCartApi = (data: { skuId: string; quantity: number }) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}
/**
 * 获取购物车列表
 * @returns
 */
export const getMemberCartApi = () => {
  return http<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}

/**
 * 删除购物车
 * @param data skuId集合
 * @returns
 */
export const deleteMemberCartApi = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data,
  })
}
/**
 * 修改购物车单品
 * @param skuId
 * @param data
 * @returns
 */
export const putMemberCartBySkuIdApi = (
  skuId: string,
  data: { selected?: boolean; quantity?: number },
) => {
  return http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}

/**
 * 购物车全选/全不选
 * @param data
 * @returns
 */
export const getMemberCartSelectedApi = (data: { selected: boolean }) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data,
  })
}
