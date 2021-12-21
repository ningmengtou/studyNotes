import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"

import rootReducer from "../reducers";

// createStore 创建 store 
// 参数一就是合并后的 reducer 
const store = createStore(rootReducer,composeWithDevTools())

export default store