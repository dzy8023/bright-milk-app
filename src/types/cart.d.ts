import type { SkuSpecItem } from './good'

export type CartItem = {
  /**商品属性文字 */
  attrsText: string
  /**商品数量 */
  quantity: number
  /**折扣 */
  discount: number
  /**商品id */
  id: string
  /** 商品名称 */
  name: string
  /** 商品图片 */
  image: string
  /** 加入时价格 */
  price: number
  /** SKU ID */
  skuId: string
  /**
   * sku销售属性,规格集合
   */
  specs: SkuSpecItem[]
  /**库存 */
  stock: number
  /**商品折扣 */
  discount: number
}
