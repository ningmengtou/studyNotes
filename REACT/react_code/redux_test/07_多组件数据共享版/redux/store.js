// 引入 createStore 用于创建 store 
import { createStore,applyMiddleware,combineReducers } from "redux";
// 引入 count reducer 方法
import countReducer from './reducers/count'
import personReducer from './reducers/person'
// 引入 thunk 来让store可以识别函数式的action
import thunk from "redux-thunk";


// combineReducers 方法用于合并所有的reducers
// 参数是一个对象 key 为状态中的key value 为 reducer 
const allReducer = combineReducers({
    count:countReducer,
    persons:personReducer
})

// 通过createStore创建store(参数是一个reducer) 并且暴露出去
// 使用 thunk 需要多使用一个参数 applyMiddleware(thunk)
export default createStore(allReducer,applyMiddleware(thunk))