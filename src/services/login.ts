import type { LogingResult } from '@/types/members'
import { request } from '@/utils/request'

type loginParams = {
    code: string
    encryptedData: string
    iv: string
}
export const loginWxMinAPI = (data: loginParams) => {
    return request<LogingResult>({
        method: 'POST',
        url: '/login/wxMin',
        data
    })
}
// 小程序模拟登录的API
export const loginWxMinSimpleAPI = (phoneNumber: string) => {
    return request<LogingResult>({
        method: 'POST',
        url: '/login/wxMin/simple',
        data: {
            phoneNumber
        }
    })
}

// 传统登录方式-账号/密码
export const loginTraditionalAPI = (account: string, password: string) => {
    return request<LogingResult>({
        method: 'POST',
        url: '/login',
        data: {
            account,
            password
        }
    })
}