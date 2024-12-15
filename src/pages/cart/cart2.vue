<template>
  <CartMain :bottom="bottom" />
</template>

<script setup lang="ts">
import CartMain from './components/CartMain.vue'
// 获取屏幕边界到安全区域距离
import { useSafeAreaBottom } from '@/composables'
//安全距离
const bottom = useSafeAreaBottom() + 'px'
</script>
