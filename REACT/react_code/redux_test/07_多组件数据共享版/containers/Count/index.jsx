// 从 react-redux 中导入 connect 用于链接 ui 组件
import { connect } from 'react-redux'
// 引入 actions 
import { incrementAction, decrementAction, incrementAsyncAction } from '../../redux/actions/count'

import React, { Component } from 'react'

// ui组件
class Count extends Component {
    // 加法
    increment = () => {
        const { value } = this.selectNum
        // 调用容器组件通过 props 传递过来的方法改变 redux 中的状态
        this.props.jia(value * 1)
    }
    // 减法
    decrement = () => {
        const { value } = this.selectNum
        this.props.jian(value * 1)
    }
    // 奇数再加
    incrementIfOdd = () => {
        const { value } = this.selectNum
        if (this.props.count % 2 !== 0) {
            this.props.jia(value * 1)
        }
    }
    // 等一会再加
    incrementAsync = () => {
        const { value } = this.selectNum
        this.props.jiaAsync(value * 1, 500)
    }

    render() {
        return (
            <div>
                <h2>我是Count组件，下方人数为：{this.props.personNum}</h2>
                <h4>总数是：{this.props.count}</h4>
                <select ref={c => this.selectNum = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>奇数再加</button>&nbsp;
                <button onClick={this.incrementAsync}>等一会再加</button>
            </div>
        )
    }
}

// 容器组件的简写形式
export default connect(
    // mapStateToProps简写形式直接是一个箭头函数
    state => ({ 
        count: state.count,
        personNum:state.persons.length
     }),
    // mapDispatchToProps简写形式是一个对象 key 是方法名 value 是 action
    // react-redux 会统一通过 dispatch 分发 action 
    {
        jia: incrementAction,
        jian: decrementAction,
        jiaAsync: incrementAsyncAction
    }
)(Count)