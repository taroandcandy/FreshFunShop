import type { CategoryItem } from '@/types/category'
import { request } from '@/utils/request'

// 分类列表的请求接口
export const getCategoryAPI = () => {
  return request<CategoryItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
