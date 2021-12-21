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


    render() {
        const { messageArr } = this.state

        return (
            <div>
                <ul>
                    {
                        messageArr.map(item => {
                            return (
                                <li key={item.id}>
                                    {/* 通过 search 传递参数需要把参数写在路径上 */}
                                    <Link to={`/home/message/detail?id=${item.id}&title=${item.title}`}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr />
                {/* 通过 search 接收参数不需要声明  */}
                <Route path="/home/message/detail" component={Detail} />
            </div>
        )
    }
}
