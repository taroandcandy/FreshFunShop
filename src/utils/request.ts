/* 添加拦截器：
    拦截 request 请求
    拦截 uploadFile 文件上传

TODO：
    1. 非 http 开头需拼接地址
    2. 请求超时
    3. 添加小程序端请求头表示
    4. 添加 token 请求头标识 
*/
// request.ts

import { useMemberStore } from "@/stores";
// 接口容易出问题
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net/'
// const baseURL = 'https://apipc-xiaotuxian-front.itheima.net'



// 添加拦截器
const requestInterceptor = {
    // 拦截前触发
    invoke(options: UniApp.RequestOptions) {
        // 1.非http开头需拼接地址
        if (!options.url.startsWith('http')) {
            options.url = baseURL + options.url
        }
        // 2.请求超时，默认60s
        options.timeout = 20000
        // 3.添加小程序端请求头表示
        options.header = {
            ...options.header,
            'source-client': 'miniapp',
        }
        // 4.添加token请求标识
        const memberStore = useMemberStore()
        // 提取token
        const token = memberStore.profile?.token
        if (token) {
            options.header.Authorization = token
        }
    }
}
uni.addInterceptor('request', requestInterceptor)
uni.addInterceptor('uploadFile', requestInterceptor)
/* 
请求函数
@param UniApp.RequestOptions
@return Promise
    1. 返回 Promise 对象
    2. 请求成功
        2.1 提取核心数据 res.data
        2.2 添加类型，支持泛型
    3. 请求失败
        3.1 网络错误 -> 提示用户更换网络
        3.2 401错误 -> 清理用户信息，跳转到登录页
        3.3 其他错误 -> 根据后端错误信息轻提示
*/
interface Data<T> {
    code: string
    msg: string
    result: T
}
export const request = <T>(options: UniApp.RequestOptions) => {
    return new Promise<Data<T>>((resolve, reject) => {
        uni.request({
            ...options,
            // 请求成功
            // success(res) {
            //     if (res.statusCode >= 200 && res.statusCode < 300) {
            //         resolve(res.data as Data<T>)
            //     } else if (res.statusCode === 401) {
            //         console.log("出现问题");
            //         // 401错误->清理用户信息，跳转到登录页
            //         const memberStore = useMemberStore()
            //         memberStore.clearProfile()
            //         // uni.navigateTo({ url: '/pages/login/index' })
            //         uni.reLaunch({ url: '/pages/login/index' })
            //         reject(res)
            //     } else {
            //         uni.showToast({
            //             icon: 'none',
            //             title: (res.data as Data<T>).msg || '请求错误'
            //         })
            //     }
            // },
            success(res) {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    const data = res.data as Data<T>
                    // 业务层 token 失效
                    if (data.code === '10019') {
                        const memberStore = useMemberStore()
                        memberStore.clearProfile()
                        uni.navigateTo({ url: '/pages/login/index' })
                        reject(res)
                        return
                    }
                    resolve(data)
                } else if (res.statusCode === 401) {
                    // 如果返回401就清除当前token然后跳转到登录页面
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    uni.navigateTo({ url: '/pages/login/index' })
                    reject(res)
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: (res.data as Data<T>).msg || '请求错误'
                    })
                    reject(res)
                }
            },
            fail(err) {
                console.log("err", err);
                uni.showToast({
                    icon: 'none',
                    title: '网络错误，换个网络试试'
                })
                reject(err)
            }
        })
    })
}