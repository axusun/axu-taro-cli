import { get, post } from '@/utils/request'

/**
 * 获取图库列表
 * @param page 当前页
 * @param page_size 页面条数
 * @param keyword 关键词
 */
export const getPhotos = (page: number, page_size: number, keyword: string) =>
  get('/', {
    page,
    page_size,
    keyword,
  })


/**
 * 创建充值订单
 * @param id
 * @param pay_type
 */
export const addRecharge = (id: number, pay_type: number) =>
  post<number>('/', { id, pay_type })