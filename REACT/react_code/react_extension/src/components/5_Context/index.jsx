import React, { Component } from 'react'

import './index.css'

// 通过 React.createContext 创建 context 对象
const MyContext = React.createContext()
// 从 MyContext 中获取到 Provider(用于向子代组件传值) Consumer(用于把context取出) 标签
const { Provider, Consumer } = MyContext

export default class A extends Component {

    state = {
        username: 'tom',
        age: 20
    }

    render() {
        const { username, age } = this.state
        return (
            <div className="a">
                <h2>我是A组件</h2>
                <div>我是用户名是:{this.state.username}</div>
                {/* Provider 标签可以给子代组件中传值 value(固定写法) 就是携带的值 */}
                <Provider value={{ username, age }}>
                    <B />
                </Provider>
            </div>
        )
    }
}

class B extends Component {
    render() {
        return (
            <div className="b">
                <h2>我是B组件</h2>
                <C />
            </div>
        )
    }
}


// 类式组件 C 
// class C extends Component {
//     // 需要用到 context 的组件需要这样声明接收一下(固定写法)
//     static contextType = MyContext
//     render() {
//         return (
//             <div className="c">
//                 <h2>我是C组件</h2>
//                 {/* this.context 可以获取到context的值 */}
//                 <div>A的用户名是:{this.context.username},年龄是{this.context.age}</div>
//             </div>
//         )
//     }
// }

// 函数式组件 C
function C() {
    return (
        <div className="c">
            <h2>我是C组件</h2>
            {/* Consumer 标签包裹的函数可以接收到 context 的值(参数value) */}
            <Consumer>
                {
                    value => {
                        // 返回值直接是渲染的dom
                        return <div>A的用户名是:{value.username},年龄是{value.age}</div>
                    }
                }
            </Consumer>
        </div>
    )
}
