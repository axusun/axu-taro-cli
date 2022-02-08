import React, { useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Divider from '@/components/Divider'
import BasePage from '@/components/BasePage'
import './index.scss'

const DemoPage: React.FC = () => {
  const [showMask, setShowMask] = useState(false)

  const handleClickMask = () => {
    const flag = !showMask
    setShowMask(flag)
  }

  return (
    <BasePage className='defaultIndex' needLogin={false}>
      <View className='p-40 line-height textdefault'>
        <View className='mb-24 t1'>文字</View>
        <View className='t1'>T1 级别--标准字 36px 加粗</View>
        <View className='t2'>T2 级别--标准字 32px 加粗</View>
        <View className='t3'>T3 级别--标准字 28px 加粗</View>
        <View className='t4'>T4 级别--标准字 28px</View>
        <View className='t5'>T5 级别--标准字 26px </View>
        <View className='t6'>T6 级别--标准字 24px </View>
        <View className='t7plus'>T7plus级别--标准字 22px </View>
        <View className='t7'>T7 级别--标准字 20px </View>
        <View className='t8'>T8 级别--标准字 18px </View>
        <View className='t9'>T9 级别--标准字 16px </View>
      </View>
      <Divider text='这是一条分割线' />
      <View className='p-40'>
        <View className='mb-24 t1'>颜色</View>
        <View>默认标准字体大小 #333333</View>
        <View className='text-primary'>
          默认标准字体大小 #FF4E4F text-primary
        </View>
        <View className='text-secondary'>
          默认标准字体大小 #CC9756 text-secondary
        </View>
        <View className='text-warning'>
          默认标准字体大小 #FF8826 text-warning
        </View>
        <View className='text-success'>
          默认标准字体大小 #27682C text-success
        </View>
        <View className='text-gray'>默认标准字体大小 #666666 text-gray</View>
        <View className='text-light'>默认标准字体大小 #A5A5A5 text-light</View>
        <View className='text-gray-light'>
          默认标准字体大小 #CDCDCD text-gray-light
        </View>
      </View>
      <Divider />
      <View className='p-40 iconfont'>
        <View className='mb-24 t1'>图标</View>
        <Text className='icon-contact mr-8'></Text>
        <Text className='icon-delivery mr-8 text-primary'></Text>
        <Text className='icon-diamond mr-8 text-secondary'></Text>
        <Text className='icon-palette mr-8 t1'></Text>
        <Text className='icon-pocket mr-8'></Text>
        <Text className='icon-arrow mr-8'></Text>
        <Text className='icon-triangle mr-8'></Text>
      </View>
      <Divider />
      <View className='p-40'>
        <View className='mb-24 t1'>按钮</View>
        <View className='mb-16 t3'>默认按钮</View>
        <Button className='button button-primary m-8'>主色调</Button>
        <Button className='button button-secondary m-8'>辅助色调</Button>
        <Button className='button button-warning m-8'>警告</Button>
        <Divider />
        <View className='mb-16 t3'>不同尺寸</View>
        <Button className='button button-primary button-xs m-8'>XS</Button>
        <Button className='button button-primary button-sm m-8'>SM</Button>
        <Button className='button button-primary button-md m-8'>MD</Button>
        <Button className='button button-primary button-lg m-8'>LG</Button>
        <Divider />
        <View className='mb-16 t3'>不同状态</View>
        <Button className='button is-plain-primary m-8'>朴素按钮</Button>
        <Button className='button button-primary square m-8'>方形按钮</Button>
        <Button className='button button-primary row m-8'>整行按钮</Button>
        <Button disabled className='button button-primary row m-8 disable'>
          禁用按钮
        </Button>
        <Divider />
        <View className='mb-16 t3'>阴影效果</View>
        <Button className='button button-primary shadow m-8'>主题色</Button>
        <Button className='button button-secondary shadow m-8'>辅助色</Button>
        <Button className='button button-warning shadow m-8'>警告色</Button>
        <Divider />
        <View className='mb-16 t3'>按钮分组</View>
        <View className='button-group'>
          <Button className='button button-primary mr-24'>确认</Button>
          <Button className='button button-secondary'>取消</Button>
        </View>
      </View>
      <Divider />
      <View className='p-40'>
        <View className='mb-24 t1'>圆角</View>
        <View className='flex flex-center'>
          <View className='rectangular-demo mr-16 t6 primary round-xs'>
            XS圆角
          </View>
          <View className='rectangular-demo mr-16 t6 primary round-sm'>
            SM圆角
          </View>
          <View className='rectangular-demo mr-16 t6 primary round'>
            正常/MD
          </View>
          <View className='rectangular-demo mr-16 t6 primary round-lg'>
            LG圆角
          </View>
          <View className='rectangular-demo mr-16 t6 primary round-full'>
            完全圆角
          </View>
        </View>
      </View>
      <Divider />
      <View className='p-40'>
        <View className='mb-24 t1'>卡片</View>
        <View className='card p-24 mb-24 mr-24 shadow'>这是一个小卡片</View>
        <View className='card p-24 mb-24 border'>
          这是一个小卡片,无阴影,有边框
        </View>
        <View className='card round-lg p-24 flex flex-col flex-center shadow'>
          这是一个大卡片
          <Button
            className='button button-primary button-xs'
            onClick={handleClickMask}
          >
            出现阴影
          </Button>
        </View>
        {showMask && <View className='mask' onClick={handleClickMask}></View>}
      </View>
      <Divider />
    </BasePage>
  )
}

export default DemoPage
