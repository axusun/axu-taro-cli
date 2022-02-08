/*
 * @Author: axu
 * @Date: 2021-06-30 21:38:17
 * @LastEditTime: 2022-02-08 17:47:57
 * @LastEditors: Please set LastEditors
 * @Description: oss上传图片
 * @FilePath: /js-view-b-mini-shoper/src/utils/oss.ts
 */
import Taro from '@tarojs/taro'
import { store } from '@/store/index'

export const upToOss = (list) => {
  Taro.showLoading({
    title: '上传中',
  })
  // 上传oss服务器，返回网络url
  return new Promise((resolve, reject) => {
    const data = store.getState().oss.data
    if (!data.accessid) {
      store.dispatch.oss.getOss().then(() => {
        resolve(upToOss(list))
      })
      return
    }
    const resList: Array<string> = []
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      const index = i
      const key = `${new Date().getTime()}${index}.jpeg`
      Taro.uploadFile({
        url: data.host,
        filePath: item,
        name: 'file',
        timeout: 4000,
        formData: {
          name: 'test',
          key: key,
          OSSAccessKeyId: data.accessid,
          policy: data.policy,
          success_action_status: '200',
          signature: data.signature,
        },
      })
        .then((res) => {
          console.log('res', res)
          if (res.statusCode !== 200 && res.statusCode !== 400) {
            store.dispatch.oss.getOss().then(() => {
              resolve(upToOss(list))
            })
            return
          } else if (res.statusCode !== 400) {
            const address = data.host + '/' + key
            resList.push(address)
            if (resList.length === list.length) {
              Taro.hideLoading()
              resolve(resList)
            }
          } else if (res.statusCode === 400) {
            Taro.hideLoading()
            Taro.showToast({ title: '图片尺寸太大，上传失败', icon: 'none' })
            reject(1)
          }
        })
        .catch((err) => {
          console.log('err', err)
          Taro.showToast({
            title: '网络开小差了！！',
            icon: 'none',
            duration: 2000,
          })
        })
    }
  })
}
