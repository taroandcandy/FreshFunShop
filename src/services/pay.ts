import { request } from "@/utils/request"

// 获取微信支付参数（正式环境）
export const getWxPayMiniPayAPI = (data: { orderId: string }) => {
    return request<WechatMiniprogram.RequestPaymentOption>({
        method: 'GET',
        url: '/pay/wxPay/miniPay',
        data,
    })
}

// 模拟支付
export const getPayMockAPI = (data: { orderId: string }) => {
    return request({
        method: 'GET',
        url: '/pay/mock',
        data,
    })
}
