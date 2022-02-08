/*
 * @Author: your name
 * @Date: 2022-01-04 15:54:23
 * @LastEditTime: 2022-02-08 17:40:14
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /init/src/components/Divider/index.tsx
 */
import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface IDividerProps {
  text?: string
}

const Divider: React.FC<IDividerProps> = (props) => {
  const { text } = props
  return (
    <View className='py-24 divider'>
      <Text className='divider-line'></Text>
      {text && <Text className='divider-text px-12 t8'>{text}</Text>}
      <Text className='divider-line'></Text>
    </View>
  )
}

export default React.memo(Divider)
