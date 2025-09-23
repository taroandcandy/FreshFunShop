// 通用用户信息
type BaseProfile = {
    id: number
    avatar: string
    account: string
    nickname?: string
}
// 小程序登录--登录用户信息
export type LogingResult = BaseProfile & {
    mobile: string
    token: string
}
export type Gender = '女' | '男'
// 个人信息
export type ProfileDetail = BaseProfile & {
    gender?: Gender
    birthday?: string
    fullLocation?: string
    profession?: string
}
// 个人信息修改请求体的参数
export type ProfileParams = Pick<ProfileDetail, 'nickname' | 'gender' | 'birthday' | 'profession' | 'fullLocation'> & {
    provinceCode?: string
    cityCode?: string
    countyCode?: string
}