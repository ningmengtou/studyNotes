import React, { Component } from 'react'

export default class Count extends Component {

    state = {
        count: 0
    }
    // 加法
    increment = () => {
        const { count } = this.state
        const { value } = this.selectNum
        this.setState({
            count: count + value * 1
        })
    }
    // 减法
    decrement = () => {
        const { count } = this.state
        const { value } = this.selectNum
        this.setState({
            count: count - value * 1
        })
    }
    // 奇数再加
    incrementIfOdd = () => {
        const { count } = this.state
        const { value } = this.selectNum
        if (count % 2 !== 0) {
            this.setState({
                count: count + value * 1
            })
        }
    }
    // 等一会再加
    incrementAsync = () => {
        const { count } = this.state
        const { value } = this.selectNum
        setTimeout(() => {
            this.setState({
                count: count + value * 1
            })
        }, 500);
    }



    render() {
        return (
            <div>
                <h2>总数是：{this.state.count}</h2>
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
