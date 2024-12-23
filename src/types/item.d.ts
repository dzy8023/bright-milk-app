export type GoodItem = {
  /**
   * spu_id
   */
  id: string
  /**
   * 分类名称
   */
  categoryName?: string
  /**
   * 商品展示图
   */
  image: string
  /**
   * 商品名称
   */
  name: string
  /**
   * 商品展示价格
   */
  price: number
  /**
   * 商品销量展示
   */
  sales?: number
  /**
   * 商品折扣展示
   */
  discount?: number
  /**
   * 商品快速展示属性值
   */
  attrText?: string
  /**
   * 商品描述
   */
  desc?: string
}

/**分类数据类型 */
export type CategoryItem = {
  id: number // 分类ID
  layer: number // 分类层级
  name: string // 分类名称
  parent: CategoryItem // 父分类
}
