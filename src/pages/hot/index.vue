<template>
    <view class="viewport">
        <!-- 推荐详情页封面图 -->
        <view class="cover">
            <image :src="bannerPicture" />
        </view>
        <!-- 推荐选项 -->
        <view class="tabs">
            <text class="text" v-for="(item, index) in subTypes" :key="item.id"
                :class="{ active: activeIndex === index }" @tap="activeIndex = index">{{ item.title }}</text>
        </view>
        <!-- 推荐列表 -->
        <scroll-view scroll-y class="scroll-view" v-for="(item, index) in subTypes" :key="item.id"
            v-show="activeIndex === index" @scrolltolower="onScrolltolower">
            <view class="goods">
                <navigator :url="`/pages/goodsDetail/index?id=${goods.id}`" hover-class="none"
                    v-for="goods in item.goodsItems.items" :key="goods.id" class="navigator">
                    <image :src="goods.picture" class="thumb" />
                    <view class="name ellipsis">{{ goods.name }}</view>
                    <view class="price">
                        <text class="symbol">￥</text>
                        <text class="number">{{ goods.price }}</text>
                    </view>
                </navigator>
            </view>
            <view class="loading-text">{{ finished ? '没有更多内容了' : '正在加载中...' }}</view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { getHotRecommendAPI } from '@/services/hot';
import type { SubTypeItem } from '@/types/hot';
import { onLoad, onReady } from '@dcloudio/uni-app';

// onLoad(() => {
//     // 页面挂载完成后获取数据
//     getHotRecommendData()
// })



// uniapp获取从父组件中传过来的参数--不建议这样写
// const query = defineProps<{
//     type: number | string
// }>()
// 热门推荐页 标题和url
const hotMap = [
    { type: '1', title: '特惠推荐', url: '/hot/preference' },
    { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
    { type: '3', title: '一站买全', url: '/hot/oneStop' },
    { type: '4', title: '新鲜好物', url: '/hot/new' },
]

const type = ref('1')
let currHotMap = reactive({
    type: '',
    title: '',
    url: ''
})
onLoad(o => {
    // console.log("o", o);
    type.value = (o?.type as string) || '1'
    const foundMap = hotMap.find(v => v.type === type.value)
    // console.log("data", foundMap);
    currHotMap.type = foundMap!.type
    currHotMap.title = foundMap!.title
    currHotMap.url = foundMap!.url
    getHotRecommendData()
})
onReady(() => {
    uni.setNavigationBarTitle({ title: currHotMap!.title })
})
// 动态设置当前详情页的标题--在onready中做
// const currHotMap = hotMap.find((v) => v.type === query.type)
// uni.setNavigationBarTitle({ title: currHotMap!.title })
//顶部封面图
const bannerPicture = ref('')
// 推荐选项
const subTypes = ref<SubTypeItem[]>([])
// 选中的推荐选项的索引
const activeIndex = ref(0)
// 获取推荐页详情信息
const getHotRecommendData = async () => {
    if (!currHotMap) return
    const res = await getHotRecommendAPI(currHotMap.url, {
        // 技巧：环境变量，开发环境 - 修改初始页面方便测试(开发环境下，初始页面为30，否则为1)
        page: import.meta.env.DEV ? 33 : 1,
        pageSize: 10
    })
    bannerPicture.value = res.result.bannerPicture
    subTypes.value = res.result.subTypes
}
// 触底回调继续获取数据
const finished = ref(false)
const onScrolltolower = async () => {
    // 获取当前选中的推荐选项
    const currSubTypes = subTypes.value[activeIndex.value]!
    // 分页条件
    if (currSubTypes.goodsItems.page < currSubTypes.goodsItems.pages) {
        // 当前页码+1
        currSubTypes.goodsItems.page++
    } else {
        // 标记已经结束
        finished.value = true
        return uni.showToast({
            title: '没有更多内容了',
            icon: 'none',
        })
    }
    // 获取新的数据
    const res = await getHotRecommendAPI(currHotMap!.url, {
        subType: currSubTypes.id,
        page: currSubTypes.goodsItems.page,
        pageSize: currSubTypes.goodsItems.pageSize
    })
    const newSubTypes = res.result.subTypes[activeIndex.value]!
    // 将拿到的数据追加到当前展示列表中
    currSubTypes.goodsItems.items.push(...newSubTypes.goodsItems.items)
}
</script>

<style  lang="scss">
page {
    height: 100%;
    background-color: #f4f4f4;

    .viewport {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 180rpx 0 0;
        position: relative;

        .cover {
            width: 750rpx;
            height: 225rpx;
            border-radius: 0 0 40rpx 40rpx;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 0;
        }

        .scroll-view {
            flex: 1;

            .goods {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 0 20rpx 20rpx;

                .navigator {
                    width: 345rpx;
                    padding: 20rpx;
                    margin-top: 20rpx;
                    border-radius: 10rpx;
                    background-color: #fff;

                    .thumb {
                        width: 305rpx;
                        height: 305rpx;
                    }

                    .name {
                        height: 88rpx;
                        font-size: 26rpx;
                    }

                    .price {
                        line-height: 1;
                        color: #cf4444;
                        font-size: 30rpx;
                    }

                    .symbol {
                        font-size: 70%;
                    }

                    .decimal {
                        font-size: 70%;
                    }
                }
            }

            .loading-text {
                text-align: center;
                font-size: 28rpx;
                color: #666;
                padding: 20rpx 0 50rpx;
            }
        }

        .tabs {
            display: flex;
            justify-content: space-evenly;
            height: 100rpx;
            line-height: 90rpx;
            margin: 0 20rpx;
            font-size: 28rpx;
            border-radius: 10rpx;
            box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
            background-color: #fff;
            position: relative;
            color: #333;
            z-index: 9;

            .text {
                position: relative;
                margin: 0 20rpx;
            }

            .active {
                &::after {
                    content: '';
                    width: 40rpx;
                    height: 4rpx;
                    transform: translate(-50%);
                    background-color: #27ba9b;
                    position: absolute;
                    left: 50%;
                    bottom: 24rpx;
                }
            }
        }
    }
}
</style>