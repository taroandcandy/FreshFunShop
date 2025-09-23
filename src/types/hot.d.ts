import type { PageResult, GoodsItem } from "./global";

// 热门推荐详情页
export type HotResult = {
    id: string
    // 顶部图片
    bannerPicture: string
    title: string
    // 子类选项
    subTypes: SubTypeItem[]
}
// 热门推荐详情页-子类选项
export type SubTypeItem = {
    id: string
    title: string
    // 子类对应的商品集合
    goodsItems: PageResult<GoodsItem>
}