import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './modules/moduleA'
import {
  mutations
} from './mutations'
import state from './state'
import actions from './actions'
import * as getters from './getters'
/** 注意以上几种不同的引入方法区别 */

Vue.use(Vuex)

// 可以通过 actions 异步提交 mutations 去 修改 state 的值并通过 getter 获取
export default new Vuex.Store({
  // 根级别的 getters
  getters,
  state, // 根级别的 state
  actions, // 根级别的 action
  mutations, // 根级别的 mutations
  modules: {
    moduleA // 引入 A 模块
  }
})
