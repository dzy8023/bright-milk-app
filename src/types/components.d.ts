import type GMmkGuess from '@/components/GMmkGuess.vue'
import type GMmkSwiper from '@/components/GMmkSwiper.vue'
declare module 'vue' {
  export interface GlobalComponents {
    GMmkSwiper: typeof GMmkSwiper
    GMmkGuess: typeof GMmkGuess
  }
}

export type GMmkGuessInstance = InstanceType<typeof GMmkGuess>
export type GMmkSwiperInstance = InstanceType<typeof GMmkSwiper>
