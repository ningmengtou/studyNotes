// 引入 count reducer 方法
import count from './count'
// 引入 person reducer 方法
import persons from './person'
// 引入 combineReducers 用于汇总所有的 reducer
import {combineReducers } from "redux";

// 把汇总的 reducer 暴露出去
export default combineReducers({
    count,
    persons
})
