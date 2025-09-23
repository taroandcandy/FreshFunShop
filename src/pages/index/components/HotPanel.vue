<template>
    <view class="hot">
        <view class="item" v-for="item in data" :key="item.id">
            <view class="title">
                <text class="title-text">{{ item.title }}</text>
                <text class="title-desc">{{ item.alt }}</text>
            </view>
            <navigator hover-class="none" :url="`/pages/hot/index?type=${item.type}`" class="cards">
                <image class="image" mode="aspectFill" :src="src" v-for="src in item.pictures" :key="src" />
            </navigator>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { HotItem } from '@/types/home';
// import { onLoad, onReady } from '@dcloudio/uni-app';
const prop = defineProps<{
    data: HotItem[]
}>()
// onReady(() => {
//     console.log("data",prop.data);
// })
</script>

<style  lang="scss">
.hot {
    display: flex;
    flex-wrap: wrap;
    min-height: 508rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    .item {
        display: flex;
        flex-direction: column;
        width: 50%;
        // height: 254rpx;
        min-height: 254rpx;
        border-right: 1rpx solid #eee;
        border-top: 1rpx solid #eee;

        &:nth-child(2n) {
            border-right: 0 none;
            /* 偶数项：第2、4、6…个 .item */
        }

        &:nth-child(-n + 2) {
            border-top: 0 none;
            /* 前两项：第1、2个 .item */
        }

        .title {
            display: flex;
            align-items: center;
            padding: 24rpx 24rpx 0;
            font-size: 32rpx;
            color: #262626;
            // justify-content: start;

            .title-desc {
                font-size: 24rpx;
                color: #7f7f7f;
                margin-left: 18rpx;
            }
        }

        .cards {
            flex: 1;
            padding: 15rpx 20rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .image {
                width: 150rpx;
                height: 150rpx;
            }
        }
    }


}
</style>