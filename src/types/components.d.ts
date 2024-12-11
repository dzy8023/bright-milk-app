import type GMmkSwiper from '@/components/GMmkSwiper.vue'
declare module 'vue' {
  export interface GlobalComponents {
    GMmkSwiper: typeof GMmkSwiper
  }
}
