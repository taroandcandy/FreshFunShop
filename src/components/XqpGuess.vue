<template>
    <!-- 猜你喜欢组件 -->
    <view class="caption">
        <text class="text">猜你喜欢</text>
    </view>
    <view class="guess">
        <navigator class="guess-item" :url="`/pages/goodsDetail/index?id=${item.id}`" v-for="item in guessList"
            :key="item.id">
            <image :src="item.picture" mode="aspectFill" class="image" />
            <view class="name">{{ item.name }}</view>
            <view class="price">
                <text class="small">￥</text>
                <text>{{ item.price }}</text>
            </view>
        </navigator>
    </view>
    <view class="loading-text">{{ finished ? '没有更多内容了' : '正在加载中...' }}</view>
</template>

<script setup lang="ts">
import { getHomeGuessAPI } from '@/services/home';
import type { PageParams } from '@/types/global';
import type { GuessItem } from '@/types/home';
import { ref, onMounted } from 'vue';

// 分页参数
// 将可选参数转成必选
const pageParams: Required<PageParams> = {
    page: 1,
    pageSize: 10
}
// 是否已经获取完所有数据
const finished = ref(false)
// 获取猜你喜欢的数据
const guessList = ref<GuessItem[]>([])
// 去重
const seenIds = ref(new Set<string>())
const getHomeGuessData = async () => {
    if (finished.value) {
        return uni.showToast({ icon: 'none', title: '没有更多内容了' })
    }
    // const res = await getHomeGuessAPI(pageParams)
    // // 追加到数组后面
    // guessList.value.push(...res.result.items)

    const { result } = await getHomeGuessAPI(pageParams)
    const unique = result.items.filter(i => !seenIds.value.has(i.id))
    unique.forEach(i => seenIds.value.add(i.id))
    guessList.value.push(...unique)

    // 页码累加
    if (pageParams.page < result.pages) {
        pageParams.page++
    } else {
        finished.value = true
    }
}
// 重置数据
const resetData = () => {
    pageParams.page = 1
    guessList.value = []
    finished.value = false
}
// 组件挂载时获取数据
onMounted(() => {
    getHomeGuessData()
})
// 暴露组件内部的方法
defineExpose({
    resetData,
    getMore: getHomeGuessData,
})
</script>

<style lang="scss">
:host {
    display: block;
}

.caption {
    display: flex;
    justify-content: center;
    line-height: 1;
    padding: 36rpx 0 40rpx;
    font-size: 32rpx;
    color: #262626;

    .text {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 28rpx 0 30rpx;

        &::before,
        &::after {
            content: '';
            width: 20rpx;
            height: 20rpx;
            background-image: url('@/static/images/bubble.png') no-repeat center / contain;
            // background-size: contain;
            margin: 0 10rpx;
        }
    }
}

.guess {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20rpx;

    .guess-item {
        width: 345rpx;
        padding: 24rpx 20rpx 20rpx;
        margin-bottom: 20rpx;
        border-radius: 10rpx;
        overflow: hidden;
        background-color: #fff;

        .image {
            display: block;
            width: 304rpx;
            height: 304rpx;
        }

        .name {
            height: 75rpx;
            margin: 10rpx 0;
            font-size: 26rpx;
            color: #262626;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .price {
            line-height: 1;
            padding-top: 4rpx;
            color: #cf4444;
            font-size: 26rpx;

            .small {
                font-size: 80%;
            }
        }
    }
}

.loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
}
</style>