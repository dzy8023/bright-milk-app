import type { GoodItem } from './good'
import type { PageResult } from './pageQuery'

export type HotItem = {
  id: number
  title: string
  image: string
}
export type HotTopic = HotItem & {
  sub: (HotItem & { goods: PageResult<GoodItem> })[]
}