import type { HotTopic } from '@/types/hot'
import type { PageQuery } from '@/types/pageQuery'
import { http } from '@/utils/http'

/**
 * 根据父推荐id获取其子推荐的分页数据
 * 如果有subId参数，则获取子推荐
 * @param id
 * @param data
 * @returns
 */
export const getHotTopicApi = async (
  url: string,
  id: number,
  data: PageQuery & { subId?: number } = { page: 1, pageSize: 5 },
) => {
  return http<HotTopic>({
    method: 'GET',
    url: `${url}/${id}`,
    data,
  })
}
