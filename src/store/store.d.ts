/*
 * @Author: axu
 * @Date: 2021-12-16 21:56:40
 * @LastEditTime: 2022-02-08 17:52:02
 * @LastEditors: Please set LastEditors
 * @Description: ts
 * @FilePath: /mini-view-nc-wms/src/store/store.d.ts
 */
declare namespace Store {
  namespace Global {
    // 全局对象
    interface IGlobal {
      userToken: string
      systemInfo: Taro.getSystemInfoSync.Result
    }
    interface IBdinfo {
      username: string
      mobile: string
    }
  }
  namespace Oss {
    interface OssItem {
      accessid: string
      dir: string
      expire: number
      host: string
      policy: string
      signature: string
    }
  }
}
