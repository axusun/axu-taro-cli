/*
 * @Author: axu
 * @Date: 2021-12-16 21:56:40
 * @LastEditTime: 2022-02-08 17:46:24
 * @LastEditors: Please set LastEditors
 * @Description: 工具类
 * @FilePath: /init/src/utils/common.ts
 */

import Taro from '@tarojs/taro'

/**
 * 跳转到H5页面
 * @param url H5链接
 * @param redirectTo 是否重定向，默认不
 * @param share 是否可以分享，默认不可以
 */
export const navigateToH5 = (
  url: string,
  redirectTo?: boolean,
  share?: boolean
) => {
  if (redirectTo) {
    navigateToPage(
      `/pages/${share ? 'shared_web' : 'web'}/index?url=${encodeURIComponent(
        url
      )}`,
      'redirectTo'
    )
  } else {
    navigateToPage(
      `/pages/${share ? 'shared_web' : 'web'}/index?url=${encodeURIComponent(
        url
      )}`
    )
  }
}

/**
 *
 * @param url 待跳转的小程序页面链接
 * @param type 跳转方式
 * @default navigateTo 正常跳转
 * @property {string} navigateTo 正常跳转，会留下历史记录
 * @property {string} redirectTo 重定向，会顶掉当然页面历史记录
 * @property {string} relaunch 关闭所有页面，并打开一个新页面
 * @property {string} switchTab 跳转到tab页，并且关闭所有页面
 */
export const navigateToPage = (
  url: string,
  type: 'navigateTo' | 'redirectTo' | 'relaunch' | 'switchTab' = 'navigateTo'
) => {
  const handle404 = () => {
    navigateToPage('/pages/404/index')
  }
  if (type === 'navigateTo') {
    Taro.navigateTo({
      url,
      fail: handle404,
    })
  } else if (type === 'redirectTo') {
    Taro.redirectTo({
      url,
      fail: handle404,
    })
  } else if (type === 'relaunch') {
    Taro.reLaunch({
      url,
      fail: handle404,
    })
  } else if (type === 'switchTab') {
    Taro.switchTab({
      url,
      fail: handle404,
    })
  }
}

/**
 * 格式化时间
 * @param {string|Date|number} date 时间
 * @param fmt 时间格式
 * @default fmt 'yyyy-MM-dd hh:mm:ss'
 * @returns
 */
export const formatDate = (
  date: string | Date | number,
  fmt = 'yyyy/MM/dd hh:mm:ss'
) => {
  if (!date) return ''
  let dateObject: Date
  if (date instanceof Date) {
    dateObject = date
  } else if (!Number.isNaN(Number(date))) {
    dateObject = new Date(Number(date) * 1000)
  } else {
    const newDate = date.toString().replace(/-/g, '/')
    dateObject = new Date(newDate)
    if (dateObject.toString() === 'Invalid Date') {
      dateObject = new Date(date)
    }
  }
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1
  const day = dateObject.getDate()
  const hour = dateObject.getHours()
  const minutes = dateObject.getMinutes()
  const seconds = dateObject.getSeconds()
  return fmt
    .replace('yyyy', year + '')
    .replace('MM', format(month))
    .replace('M', month + '')
    .replace('dd', format(day))
    .replace('d', day + '')
    .replace('hh', format(hour))
    .replace('mm', format(minutes))
    .replace('ss', format(seconds))
}

const format = (num) => {
  return num >= 10 ? num : '0' + num
}

/**
 * 数字千分位格式化方法
 * @param num 待格式化的数字
 * @returns 格式化后的数字
 */
export const kiloReg = (num: string | number) => {
  // 正则千分符
  if (typeof num === 'string') {
    const result = parseFloat(num)
    if (num && Number.isNaN(result)) {
      return num
    } else {
      num = num ? result.toFixed(2) : '0.00'
    }
  } else {
    num = num ? num.toFixed(2) : '0.00'
  }
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 格式化价格
 * @description 因为系统里面大部分的价格都是显示到分位，所以页面展示的时候需要格式化
 * @param price 价格，单位分
 */
export const formatPrice = (price: number | string) => {
  if (Number.isNaN(Number(price))) {
    return 0
  }
  // return (Number(price) * 100).toFixed(2)
  return (Number(price) / 100).toFixed(2)
}

/**
 * 复制字符串
 * @param val 复制的值
 */
export const copyVal = (val: string) => {
  Taro.setClipboardData({
    data: val,
    success() {
      Taro.showToast({
        title: '复制成功～',
        icon: 'success',
      })
    },
    fail() {
      Taro.showToast({
        title: '复制失败～',
        icon: 'none',
      })
    },
  })
}


/**
 * 获取未来时间列表
 */
export const getPreDayNew = (time, num) => {
  const arr: Array<any> = []
  const dd = new Date(time)
  for (let i = 1; i <= num; i++) {
    dd.setDate(dd.getDate() - 1) //获取p_count天后的日期
    const y = dd.getFullYear()
    let m: string | number = dd.getMonth() + 1 //获取当前月份的日期
    if (m < 10) {
      m = '0' + m
    }
    let d: string | number = dd.getDate()
    if (d < 10) {
      d = '0' + d
    }
    arr.push(y + '/' + m + '/' + d)
  }
  return arr
}

// 获取N天后的时间
export const getLastTime = (n) => {
  const dd = new Date()
  const num = n
  dd.setDate(dd.getDate() + Number(num))
  const year = dd.getFullYear()
  let month: string | number = dd.getMonth() + 1
  let day: string | number = dd.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return String(year + '/' + month + '/' + day)
}

/**
 * px转rpx
 */
export const pxToRpx = (px: number) => {
  const pixelRatio = 750 / Taro.getSystemInfoSync().windowWidth
  return px * pixelRatio
}

/**
 * rpx转px
 */
export const rpxToPx = (rpx: number) => {
  const pixelRatio = 750 / Taro.getSystemInfoSync().windowWidth
  return rpx / pixelRatio
}
