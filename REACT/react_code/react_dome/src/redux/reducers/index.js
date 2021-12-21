import { combineReducers } from "redux";
import city from './city'
import search from "./search";
import login from "./login";
import collect from "./collect";


// 合并 reducer 最后只导出一个 reducer 
const rootReducer = combineReducers({
    city,
    search,
    login,
    collect,
})

export default rootReducer