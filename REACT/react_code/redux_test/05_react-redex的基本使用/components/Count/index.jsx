import React, { Component } from 'react'

export default class Count extends Component {
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
                {/* 从容器组件中获取count状态 */}
                <h2>总数是：{this.props.count}</h2>
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
