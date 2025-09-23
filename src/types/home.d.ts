import type { GoodsItem } from "./global";

// 首页banner区域数据类型
export type BannerItem = {
    // 跳转连接
    hrefUrl: string
    // id
    id: string
    // 图片链接
    imgUrl: string
    // 跳转类型
    type: number
}
// 首页-前台类目数据类型
export type CategoryItem = {
    // 图标路径
    icon: string
    id: string
    // 分类名称
    name: string
}
// 首页热门推荐数据类型
export type HotItem = {
    // 说明
    alt: string
    id: string
    // 图片集合
    pictures: string[]
    target: string
    title: string
    // 推荐类型
    type: string
}
// 猜你喜欢区域的数据类型
export type GuessItem = GoodsItem