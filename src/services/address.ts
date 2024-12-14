import type { AddressItem, AddressParams } from '@/types/address'
import { http } from '@/utils/http'
/**
 * 获取收货地址
 * @param data
 * @returns
 */
// 定义API调用函数，根据传入的id决定返回的类型
export const getMemberAddressApi = <T extends string | undefined>(id?: T) => {
  return http<T extends string ? AddressItem : AddressItem[]>({
    method: 'GET',
    url: `/member/address${id ? `/${id}` : ''}`,
  })
}

/**
 * 新增地址
 * @param data
 * @returns
 */
export const postMemberAddressApi = (data: AddressParams) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

/**
 * 修改收货地址
 * @param id 地址id(路径参数)
 * @param data 表单数据(请求体参数)
 */
export const putMemberAddressByIdApi = (id: string, data: AddressParams) => {
  return http({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}
/**
 * 删除收货地址
 * @param id
 * @returns
 */
export const deleteMemberAddressByIdApi = (id: string) => {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
