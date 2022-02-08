import React from 'react'
import NoData from '@/components/NoData'
import './index.scss'

const DemoPage: React.FC = () => {
  return (
    <NoData
      title='抱歉，您访问的商品或内容已经下架'
      desc='前往首页发现更多精彩'
      button='回到首页'
    ></NoData>
  )
}

export default DemoPage
