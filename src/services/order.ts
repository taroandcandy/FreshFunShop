// 订单相关的api
import type {
    OrderCreateParams,
    OrderListParams,
    OrderListResult,
    OrderLogisticResult,
    OrderResult,
    OrderPreResult
} from "@/types/order";
import { request } from "@/utils/request";

// 填写订单--获取预付订单
export const getMemberOrderPreAPI = () => {
    return request<OrderPreResult>({
        method: 'GET',
        url: '/member/order/pre',
    })
}

// 填写订单-获取立即购买订单
export const getMemberOrderPreNowAPI = (data: {
    skuId: string
    count: string
    addressId?: string
}) => {
    return request<OrderPreResult>({
        method: 'GET',
        url: 'member/order/pre/now',
        data,
    })
}

// 提交订单
export const postMemberOrderAPI = (data: OrderCreateParams) => {
    return request<{ id: string }>({
        method: 'POST',
        url: 'member/order',
        data,
    })
}

// 获取订单详情---需要携带token信息
export const getMemberOrderByIdAPI = (id: string) => {
    return request<OrderResult>({
        method: 'GET',
        url: `member/order/${id}`,
        // header: {
        //     Authorization: token
        // }
    })
}
//模拟发货
export const getMemberOrderConsigmentByIdAPI = (id: string) => {
    return request({
        method: 'GET',
        url: `/member/order/consignment/${id}`,
    })
}

// 确认收货
export const getMemberOrderReceiptAPI = (id: string) => {
    return request<OrderResult>({
        method: 'PUT',
        url: `/member/order/${id}/receipt`,
    })
}
// 获取订单物流
export const getMemberOrderLogisticsAPI = (id: string) => {
    return request<OrderLogisticResult>({
        method: 'GET',
        url: `/member/order/${id}/logistics`,
    })
}

// 删除订单
export const deleteMemberOrderAPI = (data: { ids: string[] }) => {
    return request({
        method: 'DELETE',
        url: '/member/order',
        data,
    })
}

// 获取订单列表---需要携带token
export const getMemberOrderListAPI = (data: OrderListParams) => {
    return request<OrderListResult>({
        method: 'GET',
        url: '/member/order',
        data,
        // header: {
        //     Authorization: token
        // }
    })
}
