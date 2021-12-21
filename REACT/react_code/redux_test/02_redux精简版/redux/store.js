// 引入 createStore 用于创建 store 
import { createStore } from "redux";
// 引入 reducer 方法
import countReducer from './count_reducer'

// 通过createStore创建store(参数是一个reducer) 并且暴露出去
export default createStore(countReducer)