import React from 'react'
import { View, Button, Image } from '@tarojs/components'
import { navigateToPage } from '@/utils/common'
import noDataImg from '@/assets/image/zanwu_2x.png'
import './index.scss'

interface IPageProps extends IProps {
  className?: string
  styleVal?: string
  title?: string
  img?: string
  desc?: string
  button?: string
  callback?: () => void
}

const NoData: React.FC<IPageProps> = (props: IPageProps) => {
  const GotoIndex = () => {
    navigateToPage('/pages/homepage/index', 'switchTab')
  }
  return (
    <View
      className={['By-no-data', props.className].join(' ')}
      style={props.styleVal}
    >
      <View className='By-no-data-item'>
        <Image
          className='By-no-data__Img'
          src={props.img || noDataImg}
          mode='aspectFit'
        />
        <View className='text-light mt-12'>{props.desc}</View>
        <View className='By-no-data__operator'>
          {props.button && (
            <Button
              className='button button-primary By-no-data__btn'
              onClick={props.callback ? props.callback : GotoIndex}
            >
              {props.button}
            </Button>
          )}
          {props.children}
        </View>
      </View>
    </View>
  )
}

export default NoData
