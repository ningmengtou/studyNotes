// action 本质是一个函数用于创建一个 action 对象
import { INCREMENT, DECREMENT } from '../constant'

// 同步 action 返回值是一个简单的js对象
export const increment = data => ({ type: INCREMENT, data })
export const decrement = data => ({ type: DECREMENT, data })

// 异步 action 返回值是一个需要异步处理的函数
export const incrementAsync = (data,time)=>{
    return (dispatch)=>{
        // 异步处理中也是调用同步 action 
        setTimeout(()=>{
            // 调用 incrementAction 生成 action 对象
            dispatch(increment(data))
        },time)
    }
}