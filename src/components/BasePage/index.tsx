import React, { useEffect } from 'react'
import { Button, View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import NoData from '@/components/NoData'
import './index.scss'

interface IPageProps extends IProps {
  needLogin?: boolean
  loading?: boolean
  className?: string
  styleVal?: string
  onBinded?: () => void
  showContact?: boolean
}

const BasePage: React.FC<IPageProps> = (props: IPageProps) => {
  const { loading,className, styleVal,needLogin } = props
  const systemInfo = useSelector((state: RootState) => state.global.systemInfo)
  const userToken = useSelector((state: RootState) => state.global.userToken)
  const styleVars = `
    --textarea-inside-margin: ${systemInfo.platform === 'ios' ? '-6px' : '0px'};
    --safe-top-padding: ${systemInfo.safeArea?.top}px;
  `
  useEffect(() => {
    
  }, [])

  return (
    <View className='state-page'>
      {!userToken && needLogin &&  (
        <NoData img={''} desc='登录发现更多'>
            <Button className='button button-primary btn-login mt-20'>
              立即登录
            </Button>
        </NoData>
      )}
      {(userToken || !needLogin) && (
        <View className={className} style={styleVars + styleVal}>
          {loading && <View className='glass-cover'></View>}
          {props.children}
        </View>
      )}
    </View>
  )
}

export default BasePage
