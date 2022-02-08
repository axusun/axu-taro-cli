/*
 * @Author: axu
 * @Date: 2021-11-11 15:58:53
 * @LastEditTime: 2022-02-08 17:51:40
 * @LastEditors: Please set LastEditors
 * @Description: 系统参数
 * @FilePath: /init/src/store/models/global.ts
 */

import { createModel } from '@rematch/core'
import Taro from '@tarojs/taro'
import { RootModel } from '.'

export const global = createModel<RootModel>()({
  state: {
    userToken: Taro.getStorageSync('token') || '',
    systemInfo: {} as Taro.getSystemInfoSync.Result,
  } as Store.Global.IGlobal,
  reducers: {
    setToken: (state, userToken: string) => {
      return {
        ...state,
        userToken,
      }
    },
    setSystemInfoSync: (state, systemInfo: Taro.getSystemInfoSync.Result) => {
      return {
        ...state,
        systemInfo,
      }
    },
  },
  effects: (dispatch) => ({
    setUserToken(token: string) {
      dispatch.global.setToken(token)
      Taro.setStorageSync('token', token)
    },
    cleanUserToken() {
      dispatch.global.setToken('')
      Taro.removeStorageSync('token')
    },
    setSystemInfo() {
      const systemInfo = Taro.getSystemInfoSync()
      dispatch.global.setSystemInfoSync(systemInfo)
    },
  }),
})
