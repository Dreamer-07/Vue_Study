// 导入需要使用的函数：createStore() 创建 Store 对象
import { createStore } from 'vuex'

// 导入 / 定义需要使用的模块(属性)

// 状态对象
const state = {
  // 初始化出局
  count: 0
};

// 包含多个事件回调函数的对象 
const actions = {
  // 定义事件回调函数 - action
  increment ( { commit }: any ) {
    // 调用对应的更新事件(回调函数)更新state
    commit('addCount');
  },
  decrement ({ commit }: any) {
    commit('reduceCount');
  },
  incrementIfOdd ( { commit , state }: any ) {
    if(state.count % 2 === 0){
      // 如果符合条件判断就执行相应的更新函数
      commit('addCount');
    }
  },
  incrementAsync ({ commit }: any) {
    setTimeout(() => {
      commit('addCount');
    }, 1000);
  }
};

// 包含多个更新 state 回调函数的对象
const mutations = {
  addCount ( state: {count: number} ) {
    state.count++;
  },
  reduceCount ( state: {count: number} ) {
    state.count--;
  }
};

// 包含多个 getter 计算属性的对象
const getters = {
  // 定义 getter 计算属性
  evenOrOdd (state: {count: number}) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
};

// 导入创建的 Store 对象
export default createStore({
  state, // 状态对象
  actions, // 包含多个更新 state 回调函数的对象
  mutations, // 包含多个事件回调函数的对象
  getters, // 包含多个 getter 计算属性的对象
})