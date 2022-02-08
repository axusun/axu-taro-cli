import { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'
import { store } from '@/store/index'
import '@/styles/index.scss'
import './app.scss'

//友盟埋点
// let uma: any = {}
// if (process.env.TARO_ENV === 'weapp' && process.env.NODE_ENV === 'production') {
//   uma = require('umtrack-wx')
//   uma.init({
//     appKey: '',
//     useOpenid: true,
//     autoGetOpenid: true,
//     debug: false,
//     enableVerify: true,
//   })
//   Taro['uma'] = uma
// }

class App extends Component {
  props: any
  onLaunch(options: Taro.General.LaunchOptionsApp) {
    // 统一处理scene参数
    this.handleRecordParams(options)

    // 获取启动参数接口
    this.handleStartup()

  }

  componentDidShow(options: Taro.General.LaunchOptionsApp) {
    // 检查版本更新
    this.checkVersion()

    // 获取定位
    // this.handleAuthLocation()

    // 统一处理scene参数
    this.handleRecordParams(options)

    // 获取通用接口
  }


  onError(err) {
    console.log('err', err)
  }

  componentDidCatchError(error: string) {
    console.log('global', error)
  }

  /**
   * 检查并更新版本
   */
  checkVersion() {
    // 更新版本管理只有线上版本才有版本的概念，体验版没有
    // 所以需要对以下代码进行编译环境处理
    if (process.env.NODE_ENV === 'production') {
      const updateManager = Taro.getUpdateManager()
      // 版本有更新
      updateManager.onUpdateReady(function () {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          showCancel: false,
          cancelColor: '#A5A5A5',
          confirmColor: '#FF4E4F',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          },
        })
      })
      // 版本更新失败
      // updateManager.onUpdateFailed(function (res) {
      // 	// 新的版本下载失败
      // })
    }
  }

  /**
   * 记录scene值
   */
  handleRecordParams(options: Taro.General.LaunchOptionsApp) {
    // 处理 scene 参数
    if (options.query && options.query['scene']) {
      
    }
  }

  /**
   * 获取启动参数
   */
  handleStartup() {
    // 获取系统信息
    store.dispatch.global.setSystemInfo()
  }

  /**
   * 获取预加载数据
   */
  handlePreFetch() {
    try {
      if (process.env.NODE_ENV === 'production') {
        Taro.getBackgroundFetchData({
          fetchType: 'pre',
          success: (res: Taro.General.CallbackResult & any) => {
            const { errMsg, fetchedData } = res
            if (errMsg === 'getBackgroundFetchData:ok') {
              try {
                const data = JSON.parse(fetchedData)
                if (data.code === 1) {
                  // 请求
                }
              } catch (err) {
              }
            }
          },
        })
      } else {
      }
    } catch (err) {
      console.log(Taro)
    }
  }

  // 处理地理位置的获取
  handleAuthLocation() {
    try {
      Taro.getSetting({
        success: (res) => {
          if (!res.authSetting['scope.userLocation']) {
            this.doLocationAuth()
          } else {
            this.getLocation()
          }
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  // 拉起地理位置授权
  doLocationAuth() {
    Taro.authorize({
      scope: 'scope.userLocation',
      success: () => {
        this.getLocation()
      },
    })
  }

  // 获取地理位置
  getLocation() {
    // 获取当前登录人的经纬度
    Taro.getLocation({
      type: 'gcj02',
      success: ({ latitude, longitude }) => {
        store.dispatch.userInfo.setLocation({ latitude, longitude })
      },
    })
  }

  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
