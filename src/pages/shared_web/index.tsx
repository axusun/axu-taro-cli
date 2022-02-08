import React from 'react'
import { useRouter, useShareAppMessage } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
const SharedWeb: React.FC = () => {
  const router = useRouter()
  useShareAppMessage(() => {
    return {
      path: `/pages/shared_web/index`
    }
  })

  return <WebView src={decodeURIComponent(router.params.url || '')}></WebView>
}

export default SharedWeb
