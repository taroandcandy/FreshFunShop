import { defineStore } from "pinia";
import type { LogingResult } from "@/types/members";
import { ref } from "vue";

export const useMemberStore = defineStore(
    'member',
    () => {
        // 会员信息
        const profile = ref<LogingResult>()
        // 保存会员信息，登录时使用
        const setProfile = (val: LogingResult) => {
            profile.value = val
        }
        // 清理会员信息，退出登录时使用
        const clearProfile = () => {
            profile.value = undefined
        }
        // 记得return
        return {
            profile,
            setProfile,
            clearProfile
        }
    },
    // TODO:持久化
    {
        // 网页端配置
        // persist:true
        // 小程序端配置
        persist:{
            storage:{
                getItem(key){
                    return uni.getStorageSync(key)
                },
                setItem(key, value){
                    uni.setStorageSync(key, value)
                }
            }
        }
    }
)