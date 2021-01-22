/* 
具有多个事件回调函数的对象
*/
import storageUtil from '../utils/storageUtil'
import { ADD_TODO , REMOVE_TODO , SWITCH_IS_CHOOSE , 
    REMOVE_COMPLETED , SELECT_ALL , RECEIVE_TODOS } from './mutation-type'
export default {
    addTodo ({ commit } , todo) {
        // 请求指定的 mutation, 可以将参数用对应包装起来
        commit(ADD_TODO , {todo})
    },
    removeTodo ({ commit } , index) {
        commit(REMOVE_TODO , {index})
    }, 
    switchIsChoose ({ commit } , { isChoose , index }) {
        commit(SWITCH_IS_CHOOSE , { isChoose , index })
    },
    removeCompleted ({commit}) {
        commit(REMOVE_COMPLETED)
    },
    selectAll({commit} , check){
        commit(SELECT_ALL , {check})
    },
    initTodos({commit}){
        // 模拟异步请求
        setTimeout(() => {
            const todos = storageUtil.readStorage();
            // 请求 mutation
            commit(RECEIVE_TODOS,{todos})
        }, 1000);
    }
}
