// /src/pages/hot/hot.vue
<script setup lang="ts">
import { getHotTopicApi } from '@/services/hot'
import { HotTopic } from '@/types/hot'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useSafeAreaBottom } from '@/composables'
import PageSkeleton from './components/PageSkeleton.vue'
//安全距离
const bottom = useSafeAreaBottom()

// 热门推荐页 标题和url
const query = defineProps<{ type: number; title: string; href: string }>()
console.log(query)
const curTab = ref(0)
const hotData = ref<HotTopic>()
const loading = ref(false)
const finish = ref<boolean[]>([])

// 动态设置标题
uni.setNavigationBarTitle({ title: query.title })
const getHotTopicData = async () => {
  // 热门话题数据
  const res = await getHotTopicApi(query.href, query.type)
  hotData.value = res.result
  hotData.value.sub.forEach((item) => {
    finish.value.push(item.goods.page >= item.goods.pages)
  })
  console.log(hotData.value)
}
const onScrollTolower = async () => {
  if (finish.value[curTab.value] && !loading.value) {
    return
  }
  // 滑到底部加载更多
  const sub = hotData.value?.sub[curTab.value]!
  if (sub.goods.page < sub.goods.pages) {
    loading.value = true
    sub.goods.page += 1
    getHotTopicApi(query.href, query.type, {
      subId: sub.id,
      page: sub?.goods.page,
      pageSize: sub.goods.pageSize,
    })
      .then((res) => {
        console.log(res.result)
        sub.goods.items.push(...res.result.sub[0].goods.items)
        sub.goods.pages = res.result.sub[0].goods.pages
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    finish.value[curTab.value] = true
    uni.showToast({
      title: '没有更多数据了',
      icon: 'none',
    })
  }
}
onLoad(() => {
  getHotTopicData()
})
</script>

<template>
  <page-skeleton v-if="!hotData" />
  <view v-else class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="hotData?.sub[curTab].image"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        v-for="(item, index) in hotData?.sub"
        :key="item.id"
        class="text"
        :class="{ active: index === curTab }"
        @tap="curTab = index"
      >
        {{ item.title }}
      </text>
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      v-for="(item, index) in hotData?.sub"
      v-show="curTab === index"
      :key="item.id"
      scroll-y
      class="scroll-view"
      :style="{ marginBottom: bottom + 'px' }"
      @scrolltolower="onScrollTolower"
    >
      <GMmkGoodList :list="item.goods.items" />
      <view class="loading-text">{{ loading ? '正在加载...' : '没有更多数据了' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
@use './styles/hot.scss';
</style>
