import React, { Component } from 'react'

import { Link, Route } from 'react-router-dom'

import Detail from './Detail'

export default class Message extends Component {

    state = {
        messageArr: [
            {
                id: '01',
                title: '消息一'
            },
            {
                id: '02',
                title: '消息二'
            },
            {
                id: '03',
                title: '消息三'
            }
        ]
    }

    // replace编程式跳转
    replaceShow = (id, title) => {
        this.props.history.replace(`/home/message/detail/${id}/${title}`)
    }

    // push编程式跳转
    replacePush = (id, title) => {
        this.props.history.push(`/home/message/detail/${id}/${title}`)
    }

    render() {
        const { messageArr } = this.state

        return (
            <div>
                <ul>
                    {
                        messageArr.map(item => {
                            return (
                                <li key={item.id}>
                                    {/* 通过 state 传递参数需要给 to 赋值对象  pathname定义路径*/}
                                    <Link to={`/home/message/detail/${item.id}/${item.title}`} >{item.title}</Link>
                                    <button onClick={() => this.replaceShow(item.id, item.title)}>replace</button>
                                    <button onClick={() => this.replacePush(item.id, item.title)}>push</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr />
                {/* 通过 params 接收参数不需要声明  */}
                <Route path="/home/message/detail/:id/:title" component={Detail} />
            </div>
        )
    }
}
