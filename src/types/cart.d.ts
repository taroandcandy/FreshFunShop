// 购物车类型
export type CartItem = {
    id: string
    /** SKU ID */
    skuId: string
    name: string
    picture: string
    count: number
    /** 加入时价格 */
    price: number
    nowPrice: number
    stock: number
    selected: boolean
    /** 属性文字 */
    attrsText: string
    /** 是否为有效商品 */
    isEffective: boolean
}