/*
 * @Author: axu
 * @Date: 2021-11-11 15:58:53
 * @LastEditTime: 2022-02-08 17:47:15
 * @LastEditors: Please set LastEditors
 * @Description: 打印
 * @FilePath: /mini-view-nc-wms/src/utils/log.ts
 */
const log = (message: string, data?: any) => {
  console.log(message, data)
}

export const logError = (errorMessage: string, error?: any) => {
  log(errorMessage, error)
}
