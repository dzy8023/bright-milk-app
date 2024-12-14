import { OrderState } from '@/services/constants'
import type { OrderItem } from '@/types/order'
import type { Module } from 'vuex'
import type { RootState } from '../index'

export interface UpdatePayload {
  orderState: OrderState
  orderList: OrderItem[]
}
export interface UpdateOrderStatePayload {
  id: string
  orderState: OrderState
  targetState?: OrderState
}
export type DeleteOrderPayload = UpdateOrderStatePayload

export interface OrderLists {
  data: Array<OrderItem[]>
}

const order: Module<OrderLists, RootState> = {
  namespaced: true, // 确保启用了命名空间
  state: {
    data: [],
  },
  mutations: {
    SET_DATA(state, val: UpdatePayload) {
      // 确保 data[val.orderState] 是一个数组
      if (!state.data[val.orderState]) {
        state.data[val.orderState] = [] // 初始化为一个空数组
      }
      // 使用 push 方法添加新订单项
      state.data[val.orderState].push(...val.orderList)
    },
    RESET_DATA(state, val: OrderState) {
      // 重置指定订单状态的数据
      state.data[val] = []
      console.log('RESET_DATA', val, state.data[val])
    },
    UPDATE_NEXT_ORDERSTATE(state, val: Required<UpdateOrderStatePayload>) {
      let index = state.data[val.orderState].findIndex((item) => item.id === val.id)
      if (index !== -1) {
        //数据迁移
        state.data[val.orderState][index].orderState = val.targetState
        state.data[val.targetState]?.unshift(state.data[val.orderState][index])
        state.data[val.orderState].splice(index, 1)
      }
      //全部里面的订单也要修改
      if (state.data[0]) {
        index = state.data[0].findIndex((item) => item.id === val.id)
        if (index !== -1) {
          state.data[0][index].orderState = val.targetState
        }
      }
    },
    DELETE_ORDER(state, val: DeleteOrderPayload) {
      let index
      if (state.data[val.orderState]) {
        index = state.data[val.orderState].findIndex((item) => item.id === val.id)
        if (index !== -1) {
          state.data[val.orderState].splice(index, 1)
        }
      }
      //全部里面的订单也要删除
      if (state.data[0]) {
        index = state.data[0].findIndex((item) => item.id === val.id)
        if (index !== -1) {
          state.data[0].splice(index, 1)
        }
      }
    },
  },
  actions: {
    triggerUpdate({}, val: UpdatePayload) {
      console.log('triggerUpdate', val)
    },
    triggerPay({ commit }, val: UpdateOrderStatePayload) {
      console.log('triggerPay', val)
      commit('UPDATE_NEXT_ORDERSTATE', { ...val, targetState: OrderState.DaiFaHuo })
    },
    triggerConfirm({ commit }, val: UpdateOrderStatePayload) {
      console.log('triggerConfirm', val)
      commit('UPDATE_NEXT_ORDERSTATE', { ...val, targetState: OrderState.DaiPingJia })
    },
    triggerEvaluate({ commit }, val: UpdateOrderStatePayload) {
      console.log('triggerEvaluate', val)
      commit('UPDATE_NEXT_ORDERSTATE', { ...val, targetState: OrderState.YiWanCheng })
    },
    triggerDelete({ commit }, val: DeleteOrderPayload) {
      console.log('triggerDelete', val)
      commit('DELETE_ORDER', val)
    },
    triggerRefresh({ commit }, val: UpdatePayload) {
      console.log('triggerRefresh', val)
      commit('RESET_DATA', val.orderState)
      commit('SET_DATA', val)
    },
  },
  getters: {
    getData: (state) => state.data,
  },
}

export default order
