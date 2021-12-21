import React, { Component } from 'react'
// 这里引入的是 容器组件
import Count from './containers/Count'
import Person from './containers/Person'

export default class App extends Component {
    render() {
        return (
            <div>
                <Count />
                <hr />
                <Person />
            </div>
        )
    }
}
