import type { PageParams, PageResult } from "@/types/global";
import type { BannerItem, CategoryItem, HotItem, GuessItem } from "@/types/home";
import { request } from "@/utils/request";

// 首页-Banner区域 广告区域展示位置，1为首页（默认值），2为商品分类页
export const getHomeBannerAPI = (distributionSite = 1) => {
    return request<BannerItem[]>({
        method: 'GET',
        url: '/home/banner',
        data: { distributionSite }
    })
}
// 首页前台分类
export const getHomeCategoryAPI = () => {
    return request<CategoryItem[]>({
        method: 'GET',
        url: '/home/category/mutli'
    })
}
// 首页-热门推荐
export const getHomeHotAPI = () => {
    return request<HotItem[]>({
        method: 'GET',
        url: '/home/hot/mutli'
    })
}
// 首页猜你喜欢
export const getHomeGuessAPI = (data?: PageParams) => {
    return request<PageResult<GuessItem>>({
        method: 'GET',
        url: '/home/goods/guessLike',
        data
    })
}