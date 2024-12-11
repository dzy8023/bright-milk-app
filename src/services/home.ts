import type { GoodItem } from '@/types/good'
import type { BannerItem, HotItem } from '@/types/home'
import type { PageQuery, PageResult } from '@/types/pageQuery'
import { http } from '@/utils/http'

/**
 * 获取首页轮播图
 * @param distributionSite
 * @returns
 */
export const getHomeBannerApi = (distributionSite: number = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}

/**
 * 获取首页热门商品
 * @returns
 */
export const getHomeHotApi = () => {
  return http<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}

/**
 * 获取猜你喜欢商品列表
 * @returns
 */
export const getHomeGuessLikeApi = (data?: PageQuery) => {
  return http<PageResult<GoodItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
