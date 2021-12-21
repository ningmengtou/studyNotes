// reducer 本质就是一个函数,有两个参数分别是:之前的状态(preState) 动作对象(action)
import { INCREMENT, DECREMENT } from '../constant'

// 定义初始值
const initState = 0

// 第一个执行 reducer 时是定义初始状态 preState 是undefined 
// 通过默认参数给到最开始的值为 0
export default function countReducer(preState = initState,action) {
    // 结构获取方法名(type)和数据(data)
    const {type,data} = action

    switch (type) {
        case INCREMENT: // 加法
            return preState + data
        case DECREMENT: // 减法
            return preState - data
        default: //方法名没有匹配上直接返回 preState
            return preState
    }
}