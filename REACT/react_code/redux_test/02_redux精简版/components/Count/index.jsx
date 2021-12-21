import React, { Component } from 'react'
// 引入 store 
import store from '../../redux/store'

export default class Count extends Component {

    // // 在组件挂载之后监听 store 中状态的变化
    // componentDidMount() {
    //     // store.subscribe 能监听状态变化
    //     store.subscribe(() => {
    //         // 执行 this.setState({}) 可以调用 render 实现页面更新
    //         this.setState({})
    //     })
    // }

    // 加法
    increment = () => {
        const { value } = this.selectNum
        // store.dispatch 实现分发 action 
        // type 指定 方法名称需要和 reducer 中的方法一一对应 data 指定 值
        store.dispatch({
            type: 'increment',
            data: value * 1
        })
    }
    // 减法
    decrement = () => {
        const { value } = this.selectNum
        store.dispatch({
            type: 'decrement',
            data: value * 1
        })
    }
    // 奇数再加
    incrementIfOdd = () => {
        const  count  = store.getState()
        const { value } = this.selectNum
        if (count % 2 !== 0) {
            store.dispatch({
                type: 'increment',
                data: value * 1
            })
        }
    }
    // 等一会再加
    incrementAsync = () => {
        const  count  = store.getState()
        const { value } = this.selectNum
        setTimeout(() => {
            store.dispatch({
                type: 'increment',
                data: value * 1
            })
        }, 500);
    }



    render() {
        return (
            <div>
                <h2>总数是：{store.getState()}</h2>
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
