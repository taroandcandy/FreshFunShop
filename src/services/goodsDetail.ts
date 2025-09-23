import type { GoodsResult } from "@/types/goods";
import { request } from "@/utils/request";

// 获取商品详情
export const getGoodsByIdAPI = (id: string) => {
    return request<GoodsResult>({
        method: 'GET',
        url: `/goods?id=${id}`
    })
}