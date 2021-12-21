// 引入 createStore 用于创建 store 
import { createStore,applyMiddleware } from "redux";
// 引入 thunk 来让store可以识别函数式的action
import thunk from "redux-thunk";
// 用于支持redux开发者工具
import { composeWithDevTools } from "redux-devtools-extension";
// 引入汇总的 reducer 
import reducer from './reducers'


// 通过createStore创建store(参数是一个reducer) 并且暴露出去
// 使用 thunk 需要多使用一个参数 applyMiddleware(thunk)
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))