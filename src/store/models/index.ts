/*
 * @Author: 流光
 * @Date: 2021-05-24 18:40:07
 * @LastEditTime: 2022-01-04 16:01:11
 * @LastEditors: Please set LastEditors
 * @Description: store相关封装
 */
import { Models } from '@rematch/core'
import { global } from './global'

export interface RootModel extends Models<RootModel> {
  global: typeof global
}

export const models: RootModel = {
  global,
}
