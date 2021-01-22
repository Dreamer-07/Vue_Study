/* 
具有多个更新 state 函数的对象
*/
import { ADD_TODO , REMOVE_TODO , SWITCH_IS_CHOOSE , 
    REMOVE_COMPLETED , SELECT_ALL , RECEIVE_TODOS } from './mutation-type'
export default {
    // 接收 state(状态) 和 参数(使用解构赋值)
    [ADD_TODO] (state , { todo }) {
        state.todos.unshift(todo)
    },
    [REMOVE_TODO] (state , { index }) {
        state.todos.splice(index,1)
    },
    [SWITCH_IS_CHOOSE] (state , { isChoose , index }) {
        state.todos[index].isChoose = isChoose
    },
    [REMOVE_COMPLETED] (state) {
        state.todos = state.todos.filter(todo => !todo.isChoose)
    },
    [SELECT_ALL] (state , {check}) {
        state.todos.forEach( todo =>  todo.isChoose = check)
    },
    [RECEIVE_TODOS] (state, {todos}) {
        state.todos = todos;
    }
}