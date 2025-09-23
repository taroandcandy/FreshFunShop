<template>
  <view class="viewport">
    <view class="logo">
      <image src="@/static/images/logo1.png" />
    </view>
    <view class="login">
      <!-- 网页端表单登录 -->
      <!-- <input class="input" type="text" placeholder="请输入用户名/手机号码" /> -->
      <!-- <input class="input" type="text" password placeholder="请输入密码" /> -->
      <!-- <button class="button phone">登录</button> -->

      <!-- 小程序端授权登录 -->
      <!-- <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
        <text class="icon icon-phone"></text>
        <button @tap="onGetPhoneNumber">
          <text class="icon icon-phone">手机号快捷登录</text>
        </button>
      </button> -->
      <!-- 用账号密码登录 -->
      <view>
        <input class="input" type="text" placeholder="请输入用户名/手机号码" v-model="account" />
        <input class="input" password placeholder="请输入密码" v-model="password" />
        <button class="button phone" @tap="onLoginTraditional">登录</button>
      </view>
      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <button @tap="onGetPhoneNumberSimple">
            <text class="icon icon-phone">模拟快捷登录</text>
          </button>
        </view>
      </view>
      <view class="tips">登录/注册即视为你同意《服务条款》和《鲜趣铺隐私协议》</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { loginWxMinAPI, loginWxMinSimpleAPI, loginTraditionalAPI } from '@/services/login'
import type { LogingResult } from '@/types/members'
import { useMemberStore } from '@/stores'
import { ref } from 'vue'

const account = ref('13123456789')
const password = ref('123456')
// 登录凭证
let code = ''
onLoad(async () => {
  const res = await wx.login()
  code = res.code
})
// 登录成功后保存会员信息
const loginSuccess = (profile: LogingResult) => {
  // 将会员信息保存到pinia仓库中
  const memberStore = useMemberStore()
  memberStore.setProfile(profile)
  console.log("用户信息", memberStore.profile);
  uni.showToast({ icon: 'success', title: '登录成功' })
  // 0.5秒后跳转到登录成功后的首页
  setTimeout(() => {
    uni.navigateBack()
  }, 500);
}
// 获取用户手机号码(实际开发中的做法)
const onGetPhoneNumber: UniHelper.ButtonOnGetphonenumber = async (event) => {
  const encryptedData = event.detail!.encryptedData!
  const iv = event.detail!.iv!
  const res = await loginWxMinAPI({
    code,
    encryptedData,
    iv
  })
  loginSuccess(res.result)
}
// 模拟手机号码快捷登录(练习开发)
const onGetPhoneNumberSimple = async () => {
  // const res = await loginWxMinSimpleAPI('13980976506')
  const res = await loginWxMinSimpleAPI('13123456789')
  loginSuccess(res.result)
}
// 传统登录方式
const onLoginTraditional = async () => {
  // account:13123456789
  // password：123456
  const res = await loginTraditionalAPI(account.value, password.value)
  loginSuccess(res.result)
}
</script>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;

  .logo {
    flex: 1;
    text-align: center;

    image {
      width: 220rpx;
      height: 220rpx;
      margin-top: 15vh;
    }
  }

  .login {
    display: flex;
    flex-direction: column;
    height: 60vh;
    padding: 40rpx 20rpx 20rpx;

    .input {
      width: 100%;
      height: 80rpx;
      font-size: 28rpx;
      border-radius: 72rpx;
      border: 1px solid #ddd;
      padding-left: 30rpx;
      margin-bottom: 20rpx;
    }

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 80rpx;
      font-size: 28rpx;
      border-radius: 72rpx;
      color: #fff;

      .icon {
        font-size: 40rpx;
        margin-right: 6rpx;
      }
    }

    .phone {
      background-color: #28bb9c;
    }



    .extra {
      flex: 1;
      padding: 70rpx 70rpx 0;

      .caption {
        width: 440rpx;
        line-height: 1;
        border-top: 1rpx solid #ddd;
        font-size: 26rpx;
        color: #999;
        position: relative;

        text {
          transform: translate(-40%);
          border-color: #fff;
          position: absolute;
          top: -12rpx;
          left: 50%;
        }
      }

      .options {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 70rpx;

        button {
          padding: 0;
          background-color: transparent;
        }

        .icon {
          font-size: 24rpx;
          color: #444;
          display: flex;
          flex-direction: column;
          align-items: center;

          &::before {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80rpx;
            height: 80rpx;
            margin-bottom: 6rpx;
            font-size: 40rpx;
            border: 1rpx solid #444;
            border-radius: 50%;
          }


        }

      }
    }



    .tips {
      position: absolute;
      bottom: 80rpx;
      left: 20rpx;
      right: 20rpx;
      font-size: 22rpx;
      color: #999;
      text-align: center;
    }
  }
}
</style>