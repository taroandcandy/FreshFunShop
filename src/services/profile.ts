import type { ProfileDetail, ProfileParams } from '@/types/members'
import { request } from '@/utils/request'

// 获取个人信息的API
export const getMemberProfileAPI = () => {
    return request<ProfileDetail>({
        method: 'GET',
        url: '/member/profile',
    })
}

// 修改个人信息的API
export const changeMemberProfileAPI = (data: ProfileParams) => {
    return request<ProfileParams>({
        method: 'PUT',
        url: '/member/profile',
        data,
    })
}