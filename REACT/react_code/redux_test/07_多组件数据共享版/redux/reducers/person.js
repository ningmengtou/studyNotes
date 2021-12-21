import { ADDPERSON } from "../constant"
// 初始化人的列表
const initState = [{id:'0101',name:'xxx',age:20}]
// 创建对人列表操作的 reducer 
export default function presonReducer(preState = initState,action) {
    const {type,data} = action

    switch (type) {
        case ADDPERSON:
            return [data,...preState]
    
        default:
            return preState
    }

}