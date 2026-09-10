<!--
此文件为开发者工具生成，生成时间: 2025/9/23下午3:27:30
使用方法：
在 D:\front\Project\xiaotuxian\FreshFunShop\dist\dev\mp-weixin\pages\index\index.wxml 引入模板

```
<import src="index.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 D:\front\Project\xiaotuxian\FreshFunShop\dist\dev\mp-weixin\pages\index\index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
    <view class="sk-container">
        <view is="pages/index/components/CustomNavBar">
            <view class="navbar CustomNavBar--navbar" style="padding-top:47px">
                <view class="logo CustomNavBar--logo">
                    <image class="logo-image CustomNavBar--logo-image sk-image"></image>
                    <text class="logo-text CustomNavBar--logo-text sk-transparent sk-text-3-5714-149 sk-text">新鲜 · 亲民 ·
                        快捷</text>
                </view>
                <view class="search CustomNavBar--search">
                    <text
                        class="icon-search CustomNavBar--icon-search sk-transparent sk-text-14-2857-188 sk-text sk-pseudo sk-pseudo-circle">搜索商品</text>
                    <text class="icon-scan CustomNavBar--icon-scan sk-pseudo sk-pseudo-circle"></text>
                </view>
            </view>
        </view>
        <scroll-view :refresher-enabled="true" :scroll-y="true">
            <view is="components/XqpSwiper">
                <view class="carousel XqpSwiper--carousel">
                    <swiper :circular="true" class="swiper XqpSwiper--swiper" :interval="3000" :current="0"
                        :autoplay="false">
                        <swiper-item
                            style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
                            <navigator class="navigator XqpSwiper--navigator" hover-class="none">
                                <image class="image XqpSwiper--image sk-image" mode="aspectFill"></image>
                            </navigator>
                        </swiper-item>
                    </swiper>
                    <view class="indicator XqpSwiper--indicator">
                        <text class="dot XqpSwiper--dot active XqpSwiper--active"></text>
                        <text class="dot XqpSwiper--dot"></text>
                        <text class="dot XqpSwiper--dot"></text>
                        <text class="dot XqpSwiper--dot"></text>
                        <text class="dot XqpSwiper--dot"></text>
                    </view>
                </view>
            </view>
            <view is="pages/index/components/CategoryPanel">
                <view class="category CategoryPanel--category">
                    <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                        <image class="icon CategoryPanel--icon sk-image"></image>
                        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-214 sk-text">居家</text>
                    </navigator>
                    <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                        <image class="icon CategoryPanel--icon sk-image"></image>
                        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-456 sk-text">锦鲤</text>
                    </navigator>
                    <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                        <image class="icon CategoryPanel--icon sk-image"></image>
                        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-747 sk-text">服饰</text>
                    </navigator>
                    <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                        <image class="icon CategoryPanel--icon sk-image"></image>
                        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-676 sk-text">母婴</text>
                    </navigator>
                    <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                        <image class="icon CategoryPanel--icon sk-image"></image>
                        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-300 sk-text">个护</text>
                    </navigator>
                    <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                        <image class="icon CategoryPanel--icon sk-image"></image>
                        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-742 sk-text">严选</text>
                    </navigator>
                    <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                        <image class="icon CategoryPanel--icon sk-image"></image>
                        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-234 sk-text">数码</text>
                    </navigator>
                    <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                        <image class="icon CategoryPanel--icon sk-image"></image>
                        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-632 sk-text">运动</text>
                    </navigator>
                    <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                        <image class="icon CategoryPanel--icon sk-image"></image>
                        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-34 sk-text">杂项</text>
                    </navigator>
                    <navigator class="category-item CategoryPanel--category-item" hover-class="none">
                        <image class="icon CategoryPanel--icon sk-image"></image>
                        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-107 sk-text">品牌</text>
                    </navigator>
                </view>
            </view>
            <view is="pages/index/components/HotPanel">
                <view class="hot HotPanel--hot">
                    <view class="item HotPanel--item">
                        <view class="title HotPanel--title">
                            <text
                                class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-201 sk-text">特惠推荐</text>
                            <text
                                class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-796 sk-text">最实惠</text>
                        </view>
                        <navigator class="cards HotPanel--cards" hover-class="none">
                            <image class="image HotPanel--image sk-image" mode="aspectFill"></image>
                            <image class="image HotPanel--image sk-image" mode="aspectFill"></image>
                        </navigator>
                    </view>
                    <view class="item HotPanel--item">
                        <view class="title HotPanel--title">
                            <text
                                class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-111 sk-text">爆款推荐</text>
                            <text
                                class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-525 sk-text">最受欢迎</text>
                        </view>
                        <navigator class="cards HotPanel--cards" hover-class="none">
                            <image class="image HotPanel--image sk-image" mode="aspectFill"></image>
                            <image class="image HotPanel--image sk-image" mode="aspectFill"></image>
                        </navigator>
                    </view>
                    <view class="item HotPanel--item">
                        <view class="title HotPanel--title">
                            <text
                                class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-156 sk-text">一站买全</text>
                            <text
                                class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-132 sk-text">精心优选</text>
                        </view>
                        <navigator class="cards HotPanel--cards" hover-class="none">
                            <image class="image HotPanel--image sk-image" mode="aspectFill"></image>
                            <image class="image HotPanel--image sk-image" mode="aspectFill"></image>
                        </navigator>
                    </view>
                    <view class="item HotPanel--item">
                        <view class="title HotPanel--title">
                            <text
                                class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-81 sk-text">领劵中心</text>
                            <text
                                class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-270 sk-text">超值优惠券</text>
                        </view>
                        <navigator class="cards HotPanel--cards" hover-class="none">
                            <image class="image HotPanel--image sk-image" mode="aspectFill"></image>
                            <image class="image HotPanel--image sk-image" mode="aspectFill"></image>
                        </navigator>
                    </view>
                </view>
            </view>
            <view is="components/XqpGuess" class="r r">
                <view class="caption XqpGuess--caption">
                    <text
                        class="text XqpGuess--text sk-transparent sk-text-0-0000-413 sk-text sk-pseudo sk-pseudo-circle">猜你喜欢</text>
                </view>
            </view>
        </scroll-view>
    </view>
</template>