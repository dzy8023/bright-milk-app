<script setup lang="ts">
import {
  getMemberAddressApi,
  postMemberAddressApi,
  putMemberAddressByIdApi,
} from '@/services/address'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 表单数据
const form = ref({
  name: '', // 收货人
  phone: '', // 联系方式
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})
//uniapp获取页面参数的写法
const query = defineProps<{
  id?: string
}>()
//表单组件实例
const formRef = ref<UniHelper.UniFormsInstance>()
//定义校验规则
const rules: UniHelper.UniFormsRules = {
  receiver: {
    rules: [{ required: true, errorMessage: '请输入收货人姓名' }],
  },
  contact: {
    rules: [
      { required: true, errorMessage: '请输入联系方式' },
      { pattern: /^1[3-9]\d{9}$/, errorMessage: '手机号格式不正确' },
    ],
  },
  fullLocation: {
    rules: [{ required: true, errorMessage: '请选择所在地区' }],
  },
  address: {
    rules: [{ required: true, errorMessage: '请选择详细地址' }],
  },
}
const onSwitchChange: UniHelper.SwitchOnChange = (e) => {
  form.value.isDefault = e.detail.value ? 1 : 0
}
const onSubmit = async () => {
  try {
    await formRef.value?.validate!()
    // 判断当前页面是否有地址 id
    if (query.id) {
      // 修改地址请求
      await putMemberAddressByIdApi(query.id, form.value)
    } else {
      // 新建地址请求
      await postMemberAddressApi(form.value)
    }
    uni.showToast({ icon: 'success', title: `${query.id ? '编辑' : '新增'}成功` })
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  } catch (error) {
    uni.showToast({ icon: 'error', title: '请填写完整信息' })
  }
}

onLoad(async () => {
  //动态设置标题
  uni.setNavigationBarTitle({ title: query.id ? `编辑地址${query.id}` : '新增地址' })
  // 获取地址详情
  if (query.id) {
    // TODO: 获取地址详情
    const res = await getMemberAddressApi(query.id)
    console.log(res.result)
    // form.value = res.result
    Object.assign(form.value, res.result)
  }
})
</script>

<template>
  <view class="content">
    <uni-forms ref="formRef" :rules="rules" :model="form">
      <!-- 表单内容 -->
      <uni-forms-item name="name" label="收货人" class="form-item">
        <input v-model="form.name" class="input" placeholder="请填写收货人姓名" />
      </uni-forms-item>
      <uni-forms-item name="phone" label="手机号码" class="form-item">
        <input
          v-model="form.phone"
          class="input"
          placeholder="请填写收货人手机号码"
          :maxlength="11"
        />
      </uni-forms-item>
      <uni-forms-item name="address" label="详细地址" class="form-item">
        <input v-model="form.address" class="input" placeholder="街道、楼牌号等信息" />
      </uni-forms-item>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch
          class="switch"
          color="#27ba9b"
          :checked="form.isDefault === 1"
          @change="onSwitchChange"
        />
      </view>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @tap="onSubmit">保存并使用</button>
  {{ form }}
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
