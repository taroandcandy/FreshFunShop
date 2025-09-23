<template>
  <!-- 导航栏 -->
  <CustomNavBar></CustomNavBar>
  <!-- 滚动容器 -->
  <scroll-view scroll-y refresher-enabled @refresherrefresh="onRefresherrefresh" :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower">
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 自定义轮播图 -->
      <XqpSwiper :banner-list="bannerList" />
      <!-- 分类面板 -->
      <CategoryPanel :category-list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :data="hotList" />
      <!-- 猜你喜欢 -->
      <XqpGuess ref="guessRef"></XqpGuess>
    </template>
  </scroll-view>
</template>

<script setup lang="ts">
import CustomNavBar from '@/pages/index/components/CustomNavBar.vue';
import { ref } from 'vue';
import type { GuessItem, BannerItem, HotItem, CategoryItem } from '@/types/home';
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home';
import { onLoad } from '@dcloudio/uni-app';
import { useGuessList } from '@/composables';
// 已经全局注册，不需要引入了
import XqpSwiper from '@/components/XqpSwiper.vue';
import XqpGuess from '@/components/XqpGuess.vue';
import PageSkeleton from './components/PageSkeleton.vue';
import HotPanel from './components/HotPanel.vue';
import CategoryPanel from './components/CategoryPanel.vue';

// 是否加载中的标记
const isLoading = ref(false)
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeHotData(), getHomeCategoryData()])
  isLoading.value = false
})

// 获取banner数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
// 获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
// 获取热门数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

// 获取猜你喜欢组件的组合式函数
const { guessRef, onScrolltolower } = useGuessList()
// 下拉刷新的状态
const isTriggered = ref(false)
// 自定义下拉刷新
const onRefresherrefresh = async () => {
  // 开始下拉动画
  isTriggered.value = true
  // 重置猜你喜欢组件的数据
  guessRef.value?.resetData()
  // 等待数据加载完成
  // 1.广告栏
  // 2.分类板块
  // 3.热门推荐
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore()
  ])
  // 结束下拉动画
  isTriggered.value = false
}
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>