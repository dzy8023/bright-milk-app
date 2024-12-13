<script setup lang="ts">
import { postLoginApi, postLoginWXMinApi } from '@/services/login'
import { useMemberStore } from '@/store'
import { ref } from 'vue'

//模拟手机号码快捷登陆
const onGetPhoneNumberSimple = async () => {
  const res = await postLoginWXMinApi(import.meta.env.VITE_SIMPLE_PHONE)
  console.log(res.result)
  uni.showToast({
    title: '模拟登陆成功',
    icon: 'success',
    mask: true,
  })
  setTimeout(() => {
    //保存会员信息
    const memberStore = useMemberStore()
    memberStore.setProfile(res.result)
    //跳转到我的页面tabbar页不是普通页面
    uni.navigateBack()
  }, 1000)
}

//手机号密码登录
const form = ref({
  phone: '',
  password: '',
})
//表单组件实例
const formRef = ref<UniHelper.UniFormsInstance>()
//定义校验规则
const rules: UniHelper.UniFormsRules = {
  phone: {
    rules: [
      { required: true, errorMessage: '请输入手机号码' },
      { pattern: /^1[3-9]\d{9}$/, errorMessage: '手机号格式不正确' },
    ],
  },
  password: {
    rules: [{ required: true, errorMessage: '请输入密码' }],
  },
}
const login = async () => {
  if (formRef.value) {
    try {
      await formRef.value?.validate!()
      const res = await postLoginApi(form.value)
      console.log(res.result)
      uni.showToast({
        title: '登录成功',
        icon: 'success',
        mask: true,
      })
      setTimeout(() => {
        //保存会员信息
        const memberStore = useMemberStore()
        memberStore.setProfile(res.result)
        //跳转到我的页面tabbar页不是普通页面
        // uni.navigateBack()
        uni.switchTab({
          url: '/pages/my/my',
        })
      }, 1000)
    } catch (error) {
      uni.showToast({
        title: '请输入正确的手机号码或密码',
        icon: 'none',
        mask: true,
      })
    }
  }
}
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image
        src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png"
      ></image>
    </view>
    <view class="login">
      <!-- 网页端表单登录 -->
      <uni-forms ref="formRef" border validateTrigger="blur" :rules="rules" :model="form">
        <uni-forms-item required label="手机号码" name="phone">
          <uni-easyinput
            v-model="form.phone"
            :inputBorder="false"
            placeholder="请输入手机号码"
          ></uni-easyinput>
        </uni-forms-item>
        <uni-forms-item class="uni_password" required label="密码" name="password">
          <uni-easyinput
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            :inputBorder="false"
          ></uni-easyinput>
        </uni-forms-item>
      </uni-forms>
      <button class="button phone" @tap="login">登录</button>
      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <!-- 通用模拟登录 -->
          <button @tap="onGetPhoneNumberSimple">
            <text class="icon icon-phone">模拟快捷登录</text>
          </button>
        </view>
      </view>
      <view class="tips">登录/注册即视为你同意《服务条款》和《光明牛奶隐私协议》</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

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

  .wechat {
    background-color: #06c05f;
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
        background-color: #fff;
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
    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
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
</style>
