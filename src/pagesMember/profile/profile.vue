<script setup lang="ts">
import { getMemberProfileApi, putMemberProfileApi } from '@/services/profile'
import type { Gender, ProfileDetail } from '@/types/member'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useMemberStore } from '@/stores'
//获取屏幕边界到安全区域的距离
import { useSafeAreaTop } from '@/composables'

const statusBarHeight = useSafeAreaTop()
const memberStore = useMemberStore()
// 获取个人信息
const profile = ref({} as ProfileDetail)
const getMemberProfileData = async () => {
  const res = await getMemberProfileApi()
  profile.value = res.result
}
const onAvatarChange = () => {
  /*#ifndef MP-WEIXIN*/
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePaths = res.tempFilePaths[0]
      uploadAvatar(tempFilePaths)
    },
  })
  /*#endif*/
  /*#ifdef MP-WEIXIN*/
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (res) => {
      const { tempFilePath } = res.tempFiles[0]
      uploadAvatar(tempFilePath)
    },
  })
  /*#endif*/
}
const uploadAvatar = (filePath: string) => {
  uni.uploadFile({
    url: '/member/profile/avatar',
    name: 'file',
    filePath: filePath,
    success: (res) => {
      if (res.statusCode === 200) {
        const avatar = JSON.parse(res.data).result.avater
        profile.value.avatar = avatar
        uni.showToast({
          title: '头像修改成功',
          icon: 'success',
        })
      } else {
        uni.showToast({
          title: '头像修改失败',
          icon: 'error',
        })
      }
    },
  })
}
const onchangeGender: UniHelper.RadioGroupOnChange = (e: any) => {
  console.log(e.detail.value)
  profile.value.gender = e.detail.value as Gender
}
const onBirthdayChange: UniHelper.DatePickerOnChange = (e) => {
  profile.value.birthday = e.detail.value
  console.log('1997-06-19', profile.value.birthday)
}
const onsubmit = async () => {
  const { nickname, gender, birthday } = profile.value
  const res = await putMemberProfileApi({
    nickname,
    gender,
    birthday,
  })
  console.log(res)
  //去除birthday属性
  memberStore.profile!.nickname = profile.value.nickname
  uni.showToast({
    title: '修改成功',
    icon: 'success',
  })
  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}
onLoad(() => {
  getMemberProfileData()
})
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content">
        <image class="image" :src="profile?.avatar" mode="aspectFill" @tap="onAvatarChange" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">用户名</text>
          <text class="account">{{ profile?.username }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" :value="profile.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onchangeGender">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profile.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profile.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date().toDateString()"
            :value="profile.birthday"
            @change="onBirthdayChange"
          >
            <view v-if="profile.birthday">{{ profile.birthday }}</view>
            <view v-else class="placeholder">请选择日期</view>
          </picker>
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="onsubmit">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
