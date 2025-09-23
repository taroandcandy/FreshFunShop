<template>
    <view class="viewport">
        <!-- 地址列表 -->
        <scroll-view scroll-y class="scroll-view">
            <view class="address" v-if="addressList?.length">
                <uni-swipe-action class="address-list" autoClose>
                    <uni-swipe-action-item class="item" v-for="item in addressList" :key="item.id">
                        <view class="item-content" @tap="onChangeAddress(item)">
                            <view class="user">
                                {{ item.receiver }}
                                <!-- 联系方式 -->
                                <text class="contact">{{ item.contact }}</text>
                                <text class="badge" v-if="item.isDefault">默认</text>
                            </view>
                            <!-- 省-详细地址 -->
                            <view class="locate">{{ item.fullLocation }} {{ item.address }}</view>
                            <!-- 阻止事件冒泡 -->
                            <navigator :url="`/pagesMember/address-form/index?id=${item.id}`" hover-class="none"
                                class="edit" @tap.stop="() => { }">
                                修改
                            </navigator>
                            <view class="delete-button" @tap.stop="deleteAddressItem(item.id)">删除</view>
                        </view>
                        <!-- 右侧插槽--样式有问题 -->
                        <!-- <template #right>
                            <view class="delete-button" @tap="deleteAddressItem(item.id)">删除</view>
                        </template> -->
                    </uni-swipe-action-item>
                </uni-swipe-action>
            </view>
            <view class="blank" v-else>暂无收货地址</view>
        </scroll-view>
        <!-- 添加按钮 -->
        <view class="add-btn">
            <navigator hover-class="none" url="/pagesMember/address-form/index">
                新建地址
            </navigator>
        </view>
    </view>
</template>

<script setup lang="ts">
// 删除地址、获取地址列表
import { deleteAddressAPI, getAddressListAPI } from '@/services/address';
import { onShow } from '@dcloudio/uni-app';
import { ref } from 'vue'
import type { AddressItem } from '@/types/address';
import { useAddressStore } from '@/stores/modules/address';

// 获取收货地址列表数据
const addressList = ref<AddressItem[]>()
const getAddressListData = async () => {
    const res = await getAddressListAPI()
    addressList.value = res.result
}

// 页面显示时获取地址列表
onShow(() => {
    getAddressListData()
})

// 删除收货地址
const deleteAddressItem = (id: string) => {
    uni.showModal({
        content: '确认删除吗',
        success: async (res) => {
            if (res.confirm) {
                await deleteAddressAPI(id)
                // 重新获取地址列表
                getAddressListData()
            }
        },
    })
}

// 修改仓库中选中的收货地址
const onChangeAddress = (item: AddressItem) => {
    const addressStore = useAddressStore()
    addressStore.changeSelectedAddress(item)
    uni.navigateBack()
}
</script>

<style lang="scss" >
page {
    height: 100%;
    overflow: hidden;
}

// .delete-button {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100px;
//     height: 100%;
//     font-size: 28rpx;
//     color: #666;
//     border-radius: 0;
//     padding: 0;
//     background-color: #cf4444;
// }

.viewport {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #f4f4f4;

    .scroll-view {
        padding-top: 20rpx;

        .address {
            padding: 0 20rpx;
            margin: 0 20rpx;
            border-radius: 10rpx;
            background-color: #fff;

            .item-content {
                line-height: 1;
                padding: 40rpx 10rpx 38rpx;
                border-bottom: 1rpx solid #ddd;
                position: relative;

                .edit {
                    position: absolute;
                    top: 36rpx;
                    right: 100rpx;
                    padding: 2rpx 10rpx 2rpx 20rpx;
                    border-right: 1rpx solid #666;
                    font-size: 26rpx;
                    color: #666;
                    line-height: 1;
                }

                .delete-button {
                    position: absolute;
                    right: 0rpx;
                    top: 36rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 32rpx;
                    padding: 0 20rpx;
                    background: #cf4444;
                    color: #fff;
                    border-radius: 6rpx;
                    font-size: 26rpx;
                }
            }

            .item:last-child .item-content {
                border: none;
            }

            .user {
                font-size: 28rpx;
                margin-bottom: 20rpx;
                color: #333;

                .contact {
                    color: #666;
                }

                .badge {
                    display: inline-block;
                    padding: 4rpx 10rpx 2rpx 14rpx;
                    margin: 2rpx 0 0 10rpx;
                    font-size: 26rpx;
                    color: #27ba9b;
                    border-radius: 6rpx;
                    border: 1rpx solid #27ba9b;
                }
            }

            .locate {
                line-height: 1.6;
                font-size: 26rpx;
                color: #333;
            }
        }

        .blank {
            margin-top: 300rpx;
            text-align: center;
            font-size: 32rpx;
            color: #888;
        }
    }

    .add-btn {
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        margin: 30rpx 20rpx;
        color: #fff;
        border-radius: 80rpx;
        font-size: 30rpx;
        background-color: #27ba9b;
    }
}
</style>