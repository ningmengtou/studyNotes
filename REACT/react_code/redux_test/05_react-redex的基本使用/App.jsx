import React, { Component } from 'react'
// 引入 store 
import store from './redux/store'
// 这里引入的是 容器组件
import Count from './containers/Count'

export default class App extends Component {
    render() {
        return (
            <div>
                {/* 通过 props 把 store 传入到容器组件中 */}
                <Count store={store} />
            </div>
        )
    }
}
