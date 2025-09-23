<template>
    <!-- 轮播图组件 -->
    <view class="carousel">
        <swiper class="swiper" :autoplay="false" :interval="3000" @change="onChange" :circular="true">
            <swiper-item v-for="item in bannerList" :key="item.id">
                <navigator url="/pages/index/index" hover-class="none" class="navigator">
                    <image :src="item.imgUrl" mode="aspectFill" class="image" />
                </navigator>
            </swiper-item>
        </swiper>
        <!-- 指示点:在轮播图底部指示当前是哪一页了 -->
        <view class="indicator">
            <text class="dot" v-for="(item, index) in bannerList" :key="item.id"
                :class="{ active: index === activeIndex }"></text>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { BannerItem } from '@/types/home';
import { ref } from 'vue';

let activeIndex = ref(0)
// 接收父组件传过来的数据
defineProps<{
    bannerList: BannerItem[]
}>()
// 
const onChange: UniHelper.SwiperOnChange = (event) => {
    console.log("event", event)
    // !表示非空断言，主观上排除空值情况
    // ？表示可选链，允许前面表达式为空值
    activeIndex.value = event.detail!.current
}
</script>

<style  lang="scss">
// :host {
//     display: block;
//     height: 280rpx;
// }

.carousel {
    // height: 100%;
    display: block;
    height: 280rpx;
    position: relative;
    overflow: hidden;
    transform: translateY(0);
    background-color: #efefef;


    .swiper {
        width: 100%;
        height: 100%;
        display: block;
    }

    .indicator {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 16rpx;
        display: flex;
        justify-content: center;

        .dot {
            width: 30rpx;
            height: 6rpx;
            margin: 0 8rpx;
            border-radius: 6rpx;
            background-color: rgba(255, 255, 255, 0.4);
        }

        .active {
            background-color: #fff;
        }
    }

    .navigator,
    .image {
        width: 100%;
        height: 100%;
    }
}
</style>