import { createStore } from 'vuex'
import order from './modules/order'

export interface RootState {
  // 定义根状态的类型
}

export default createStore<RootState>({
  modules: {
    order,
  },
})
