<template>
    <view class="address-panel">
        <!-- 关闭按钮 -->
        <view class="close icon-close" @tap="emit('close')">
        </view>
        <!-- 标题 -->
        <view class="title">配送至</view>
        <!-- 内容 -->
        <view class="content">
            <view class="item" v-for="item in addressList" :key="item.id" @tap="onChangeAddress(item)">
                <view class="user">{{ item.receiver }} {{ item.contact }}</view>
                <view class="address">{{ item.fullLocation }} {{ item.address }}</view>
                <!-- 标记默认地址 -->
                <view class="icon" :class="{ 'icon-checked': item.isDefault }"></view>
            </view>
        </view>
        <!-- 底部新建地址 -->
        <view class="footer">
            <navigator url="/pagesMember/address-form/index" class="button primary" hover-class="none">
                新建地址
            </navigator>
            <view class="button primary" v-if="false">确定</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { useAddressStore } from '@/stores/modules/address';
import type { AddressItem } from '@/types/address';

// 子组件调用父组件的方法
const emit = defineEmits<{
    (event: 'close'): void
}>()

defineProps<{
    addressList: AddressItem[]
}>()

// 修改收货地址的回调
const onChangeAddress = (item: AddressItem) => {
    const addressStore = useAddressStore()
    // 修改地址
    addressStore.changeSelectedAddress(item)
    // 关闭弹窗
    emit('close')
}

</script>

<style  lang="scss">
.address-panel {
    padding: 0 30rpx;
    border-radius: 10rpx 10rpx 0 0;
    position: relative;
    background-color: #fff;

    .close {
        position: absolute;
        right: 24rpx;
        top: 24rpx;
    }

    .title {
        line-height: 1;
        padding: 40rpx 0;
        text-align: center;
        font-size: 32rpx;
        font-weight: normal;
        border-bottom: 1rpx solid #ddd;
        color: #444;
    }

    .content {
        min-height: 300rpx;
        max-height: 540rpx;
        overflow: auto;
        padding: 20rpx;

        .item {
            padding: 30rpx 50rpx 30rpx 60rpx;
            background-size: 40rpx;
            background-repeat: no-repeat;
            background-position: 0 center;
            background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
            position: relative;
        }

        .icon {
            color: #999;
            font-size: 40rpx;
            transform: translateY(-50%);
            position: absolute;
            top: 50%;
            right: 0;
        }

        .icon-checked {
            color: #27ba9b;
        }

        .icon-ring {
            color: #444;
        }

        .user {
            font-size: 28rpx;
            color: #444;
            font-weight: 500;
        }

        .address {
            font-size: 26rpx;
            color: #666;
        }
    }

    .footer {
        display: flex;
        justify-content: space-between;
        padding: 20rpx 0 40rpx;
        font-size: 28rpx;
        color: #444;

        .button {
            flex: 1;
            height: 72rpx;
            text-align: center;
            line-height: 72rpx;
            margin: 0 20rpx;
            color: #fff;
            border-radius: 72rpx;
        }

        .primary {
            color: #fff;
            background-color: #27ba9b;
        }

        .secondary {
            background-color: #ffa868;
        }
    }
}
</style>