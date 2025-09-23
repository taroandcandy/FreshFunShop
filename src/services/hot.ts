// 获取热门推荐详情页的接口
import type { PageParams } from "@/types/global";
import type { HotResult } from "@/types/hot";
import { request } from "@/utils/request";

/* 通用推荐类型
  @params url 请求地址
  @params data 请求参数
*/
type HotParams = PageParams & { subType?: string }
export const getHotRecommendAPI = (url: string, data?: HotParams) => {
    return request<HotResult>({
        method: 'GET',
        url,
        data
    })
}