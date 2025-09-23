<template>
    <view class="category">
        <navigator url="/pages/index/index" hover-class="none" class="category-item" v-for="item in categoryList"
            :key="item.id">
            <image :src="item.icon" class="icon" />
            <text class="text">{{ item.name }}</text>
        </navigator>
    </view>
</template>

<script setup lang="ts">
import type { CategoryItem } from '@/types/home';
defineProps<{
    categoryList: CategoryItem[]
}>()
</script>

<style  lang="scss">
.category {
    display: flex;
    padding: 10rpx 0;
    margin: 20rpx 0 0;
    flex-wrap: wrap;
    min-height: 328rpx;

    .category-item {
        width: 150rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        .icon {
            width: 100rpx;
            height: 100rpx;
        }

        .text {
            font-size: 26rpx;
            color: #666;
        }
    }
}
</style>