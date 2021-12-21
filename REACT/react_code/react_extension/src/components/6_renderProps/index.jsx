import React, { Component } from 'react'
import './index.css'


export default class Praent extends Component {
    render() {
        return (
            <div className="praent">
                <h2>我是父组件</h2>
                {/* 这里向 A 组件传递了一个 render 函数返回值是 B 组件  */}
                {/* 参数 name 再通过 props 传递 */}
                <A  render={(name)=><B name={name} />} />
            </div>
        )
    }
}

// A 和 B 组件不明确谁是包裹谁
class A extends Component {
    state = {
        name:"xixi"
    }
    render() {
        const {name} = this.state
        return (
            <div className="a">
                <h2>我是A组件</h2>
                {/* 调用 this.props.render(name) 可以渲染出 B 组件 */}
                {this.props.render(name)}
            </div>
        )
    }
}


class B extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="b">
                <h2>我是B组件</h2>
                {/* this.props.nam 接收到 A 组件的 name 参数 */}
                <h2>parent的名字是{this.props.name}</h2>
            </div>
        )
    }
}

