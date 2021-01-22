// 包含多个基于 state 的 getter 计算属性
export default {
    // 总任务数
    totalCount (state) {
        return state.todos.length;
    },
    // 已经完成的任务数
    completedCount (state) {
        return state.todos.reduce((count,todo) => 
            count + ( todo.isChoose ? 1 : 0 )
        ,0);
    },
    // 是否全(不)选
    selectAllBtn (state,getters) {
        return getters.totalCount === getters.completedCount && state.todos.length > 0
    }
    
}