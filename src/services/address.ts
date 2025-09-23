// 地址相关api
import type { AddressItem, AddressParams } from "@/types/address";
import { request } from "@/utils/request";

// 添加收货地址
export const postMemberAddressAPI = (data: AddressParams) => {
    return request({
        method: 'POST',
        url: '/member/address',
        data
    })
}

// 获取收货地址列表
export const getAddressListAPI = () => {
    return request<AddressItem[]>({
        method: 'GET',
        url: '/member/address'
    })
}

// 获取收货地址详情
export const getAddressByIdAPI = (id: string) => {
    return request({
        method: 'GET',
        url: `/member/address/${id}`
    })
}

// 修改收货地址
export const changeAddressAPI = (id: string, data: AddressParams) => {
    return request({
        method: 'PUT',
        url: `/member/address/${id}`,
        data
    })
}

// 删除收货地址
export const deleteAddressAPI = (id: string) => {
    return request({
        method: 'DELETE',
        url: `/member/address/${id}`
    })
}