import React, { useState} from 'react'
import { WebView } from '@tarojs/components'

const Web: React.FC = () => {
  const [url] = useState('')

  return (
    <WebView src={url} ></WebView>
  )
}

export default Web
