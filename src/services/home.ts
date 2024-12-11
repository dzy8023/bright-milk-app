import { type BannerItem } from '@/types/home'
import { http } from '@/utils/http'

/**
 * 获取首页轮播图
 * @param distributionSite
 * @returns
 */
export const getHomeBannerListApi = (distributionSite: string = '1') => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
