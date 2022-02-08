/*
 * @Author: your name
 * @Date: 2021-11-11 15:58:53
 * @LastEditTime: 2022-01-04 15:01:37
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /mini-view-nc-wms/global.d.ts
 */
declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV:
      | 'weapp'
      | 'swan'
      | 'alipay'
      | 'h5'
      | 'rn'
      | 'tt'
      | 'quickapp'
      | 'qq'
      | 'jd'
  }
}

declare const API_ROOT: string
declare const H5_ROOT: string

declare interface IProps {
  children?: any
}

declare interface ListResponse<T> {
  data: Array<T>
  last_page: number
  total: number
}
