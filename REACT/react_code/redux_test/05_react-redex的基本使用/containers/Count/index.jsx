// 引入 ui 组件
import Count from '../../components/Count'
// 从 react-redux 中导入 connect 用于链接 ui 组件
import { connect } from 'react-redux'
// 引入 actions 
import { incrementAction, decrementAction, incrementAsyncAction } from '../../redux/count_action'

// mapStateToProps 函数返回一个对象 用于传递 redux 状态 实现容器组件和ui组件状态通信
// 这里 state 参数是 store.getState() 的返回值
function mapStateToProps(state) {
    return { count: state }
}

// mapDispatchToProps 函数也是返回对象，用于传递处理状态的方法
// 这里 dispatch 参数是 store.dispatch 方法通过 dispatch 来直接改变redux的状态
function mapDispatchToProps(dispatch) {
    // 对象的 key 是方法名 value 是回调的方法
    return {
        jia: number => dispatch(incrementAction(number)),
        jian: number => dispatch(decrementAction(number)),
        jiaAsync: (number, time) => dispatch(incrementAsyncAction(number, time))
    }
}

// 使用 connect()() 获取容器组件并且导出
// 第一个调用可以接受两个函数参数 两个函数都有返回值
export default connect(mapStateToProps, mapDispatchToProps)(Count)