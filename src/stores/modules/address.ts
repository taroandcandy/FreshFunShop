// 地址相关的仓库
import type { AddressItem } from "@/types/address";
import { defineStore } from "pinia";
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
    const selectedAddress = ref<AddressItem>()
    // 修改仓库中的地址
    const changeSelectedAddress = (val: AddressItem) => {
        selectedAddress.value = val
    }
    return {
        selectedAddress,
        changeSelectedAddress
    }
})