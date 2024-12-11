import { useMemberStore } from '@/store'

const baseUrl = import.meta.env.VITE_APP_API_URL
const timeout = import.meta.env.VITE_APP_API_TIMEOUT

//拦截器配置
const httpInterceptor = {
  //拦截前触发
  invoke(options: UniApp.RequestOptions) {
    //1.非http开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseUrl + options.url
      console.log('拼接地址', options.url)
    }
    //2.设置超时时间
    options.timeout = timeout
    // 3. 添加小程序端请求头标识
    options.header = {
      'source-client': 'miniapp',
      ...options.header,
    }
    // 4. 添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

//拦截reuqest请求
uni.addInterceptor('request', httpInterceptor)
//拦截uploadFile请求
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 封装Promise请求函数
1. 返回 Promise 对象，用于处理返回值类型
2. 成功 resolve
   1. 提取数据
   2. 添加泛型
3. 失败 reject
   1. 401 错误
   2. 其他错误
   3. 网络错误
 */

type Data<T> = {
  code: string
  msg: string
  result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      //响应成功
      success: (res) => {
        //状态码2xx，参考axios设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          //提取核心数据
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          //token失效， 清理用户信息，跳转到登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({
            url: '/pages/login/login',
          })
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          //其他错误
          reject(res)
        }
      },
      //响应失败
      fail: (err) => {
        //网络错误
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}
