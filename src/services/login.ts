import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'

export const postLoginWXMinApi = (phone: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxmin',
    data: {
      phone,
    },
  })
}
type LoginParams = {
  phone: string
  password: string
}
export const postLoginApi = (params: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login',
    data: params,
  })
}
