/* 
对外暴露时有两个选择
    1. 对象
    2. 函数
    区别在于要暴露的功能数量，如果多个建议使用对象，如果少个建议使用函数
*/
const TODOS_KEY = "todos_key"
export default {
    saveStorage (todos: {title: string;isChoose: boolean}[]) {
        window.localStorage.setItem(TODOS_KEY,JSON.stringify(todos))
    },
    readStorage () : {title: string;isChoose: boolean}[] {
        return JSON.parse(window.localStorage.getItem(TODOS_KEY) || '[]')
    }
}