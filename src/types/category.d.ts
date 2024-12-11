import type { GoodItem } from './good'
import type { BannerItem } from './home'

/**
 * 一级分类
 */
export type CategoryTopItem = {
  /**
   * 分类轮播图
   */
  banner?: BannerItem[]
  /**
   * 二级分类集合
   */
  children?: CategorySubItem[]
  /**
   * 一级分类id
   */
  id: number
  /**
   * 一级分类名称
   */
  name: string
}

export type CategorySubItem = {
  goods: GoodItem[]
  /**
   * 二级分类id
   */
  id: number
  /**
   * 二级分类名称
   */
  name: string
  parentId?: number
}
