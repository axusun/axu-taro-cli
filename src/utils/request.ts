/*
 * @Author: axu
 * @Date: 2021-12-31 19:46:41
 * @LastEditTime: 2022-02-08 17:48:57
 * @LastEditors: your name
 * @Description: 请求
 * @FilePath: /init/src/utils/request.ts
 */

import Taro from '@tarojs/taro'
import { store } from '@/store/index'
import { navigateToPage } from '@/utils/common'

// 从config文件中获取当前环境对应的api根路径
const baseUrl = API_ROOT

// 不需要loading的api白名单
const noLoadingList: string[] = []

// 返回结果是流的api白名单，此类接口返回数据没有data等格式
const arrayBufferList: string[] = []

interface IResponseResult<T> {
  statusCode: number
  cookies: string[]
  errMsg: string
  // header中自定义属性较多，故用any替代
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  header: Record<string, any>
  data: IResponseData<T>
}

export interface IResponseData<T> {
  code: number
  result: T
  msg: string
}

const handle404 = () => {
  navigateToPage('/pages/404/index')
}

const toRawType = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1)
}

// 过滤无效参数
const interceptor = function (chain) {
  const requestParams = chain.requestParams
  const keys = Object.keys(requestParams.data)
  if (keys.length) {
    keys.forEach((key) => {
      const rawType = toRawType(requestParams.data)
      if (
        ['', undefined, null].includes(requestParams.data[key]) &&
        ['Object'].includes(rawType)
      ) {
        // 移除属性之前，进行深拷贝断开引用，避免影响页面
        requestParams.data = JSON.parse(JSON.stringify(requestParams.data))
        delete requestParams.data[key]
      }
    })
  }
  return chain.proceed(requestParams).then((res) => {
    return res
  })
}

/***
 * get请求
 */
export const get = <T>(
  url: string,
  data = {},
  msg?: string,
  showError = true
): Promise<T> =>
  new Promise((resolve, reject) => {
    if (msg) {
      Taro.showLoading({
        title: msg,
      })
    }
    Taro.addInterceptor(interceptor)
    Taro.request({
      url: baseUrl + url,
      method: 'GET',
      data,
      header: {
        'content-type': 'application/json',
        token: store.getState().global.userToken || '',
      },
      responseType:
        arrayBufferList.indexOf(url) < 0 ? undefined : 'arraybuffer',
      fail(res: IResponseResult<T>) {
        if (!res.data) {
          Taro.showToast({
            icon: 'none',
            title: '服务器未响应',
          })
          reject('服务器未响应')
          Taro.hideLoading()
        }
        if (res.data.code === 410) {
          store.dispatch.userInfo.initUserInfo()
          reject(res.data.msg || '网络开小差了！！！')
          Taro.hideLoading()
          return
        }
        if (res.data.code === 404) {
          handle404()
          reject(res.data.msg || '网络开小差了！！！')
          Taro.hideLoading()
          return
        }
        if (showError) {
          Taro.showToast({
            icon: 'none',
            title: res.data.msg || '网络开小差了！！！',
          })
        }
        reject(res.data.msg || '网络开小差了！！！')
        Taro.hideLoading()
      },
    }).then((res: IResponseResult<T>) => {
      if (res.data.code === 200) {
        resolve(res.data.result)
        Taro.hideLoading()
        return
      }
      if (res.data.code === 410) {
        store.dispatch.userInfo.initUserInfo()
        reject(res.data.msg || '网络开小差了！！！')
        Taro.hideLoading()
        return
      }
      if (res.data.code === 404) {
        handle404()
        reject(res.data.msg || '网络开小差了！！！')
        Taro.hideLoading()
        return
      }
      if (showError) {
        Taro.showToast({
          icon: 'none',
          title: res.data.msg || '网络开小差了！！！',
        })
      }
      reject(res.data.msg || '网络开小差了！！！')
      Taro.hideLoading()
    })
  })
/**
 * post请求
 * @param {*} url
 * @param {*} data
 */
export const post = <T>(
  url: string,
  data: any = {},
  msg?: string,
  showError = true
): Promise<T> =>
  new Promise((resolve, reject) => {
    const loading = noLoadingList.indexOf(url) < 0
    if (loading) {
      Taro.showLoading({
        title: msg || '数据加载中',
      })
    }

    Taro.request({
      url: baseUrl + url,
      method: 'POST',
      data,
      header: {
        'content-type': 'application/json',
        token: store.getState().global.userToken || '',
      },
      fail(res: IResponseResult<T>) {
        if (loading) {
          Taro.hideLoading()
        }
        if (url === 'Wechat/V1/PurOrder/price' && res.data.code === 500) {
          reject(res.data)
          return
        }
        if (url === 'Wechat/V1/PurOrder/add' && res.data.code === 500) {
          reject(res.data)
          return
        }
        if (res.data.code === 410) {
          store.dispatch.userInfo.initUserInfo()
          reject(res.data.msg || '网络开小差了！！！')
          return
        }
        if (res.data.code === 404) {
          handle404()
          reject(res.data.msg || '网络开小差了！！！')
          return
        }
        if (showError) {
          Taro.showToast({
            icon: 'none',
            title: res.data.msg || '网络开小差了！！！',
          })
        }
        reject(res.data.msg || '网络开小差了！！！')
      },
    }).then((res: IResponseResult<T>) => {
      if (loading) {
        Taro.hideLoading()
      }
      if (res.data.code === 200) {
        resolve(res.data.result)
        return
      }
      if (url === 'Wechat/V1/PurOrder/price' && res.data.code === 500) {
        reject(res.data)
        return
      }
      if (url === 'Wechat/V1/PurOrder/add' && res.data.code === 500) {
        reject(res.data)
        return
      }
      if (res.data.code === 410) {
        store.dispatch.userInfo.initUserInfo()
        reject(res.data.msg || '网络开小差了！！！')
        return
      }
      if (res.data.code === 404) {
        handle404()
        reject(res.data.msg || '网络开小差了！！！')
        return
      }
      console.log(showError)
      if (showError) {
        Taro.showToast({
          icon: 'none',
          title: res.data.msg || '网络开小差了！！！',
        })
      }
      reject(res.data.msg || '网络开小差了！！！')
    })
  })
