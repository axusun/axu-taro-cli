/*
 * @Author: axu
 * @Date: 2021-06-15 18:04:25
 * @LastEditTime: 2022-02-08 17:47:33
 * @LastEditors: Please set LastEditors
 * @Description: 埋点
 * @FilePath: /mini-view-pur/src/utils/logger.ts
 */
import Taro from '@tarojs/taro'

function logger(eventName: string, params?: any) {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.TARO_ENV === 'weapp'
  ) {
    try {
      Taro.uma.trackEvent(eventName, params)
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log(`触发埋点：${eventName}`)
  }
}

export { logger }
export default logger
