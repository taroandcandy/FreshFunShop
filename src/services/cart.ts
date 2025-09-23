// 购物车相关api
import type { CartItem } from "@/types/cart";
import { request } from "@/utils/request";

// 加入购物车api
export const addCartAPI = (data: { skuId: string; count: number }) => {
    return request({
        method: 'POST',
        url: '/member/cart',
        data
    })
}

// 获取购物车列表的api
export const getCartListAPI = () => {
    return request<CartItem[]>({
        method: 'GET',
        url: '/member/cart'
    })
}

// 删除/清空购物车商品
export const deleteCartItemAPI = (data: { ids: string[] }) => {
    return request({
        method: 'DELETE',
        url: '/member/cart',
        data
    })
}
// 修改商品数量
export const changeCartBySkuIdAPI = (skuId: string, data: { selected?: boolean; count?: number }) => {
    return request({
        method: 'PUT',
        url: `/member/cart/${skuId}`,
        data
    })
}
// 购物车全选/取消全选
export const cartSelectedAllAPI = (data: { selected: boolean }) => {
    return request({
        method: 'PUT',
        url: '/member/cart/selected',
        data
    })
}