import React, { Component } from 'react'
import qs from 'querystring'

const arr = [
    {
        id: '01',
        content: 'nihao1'
    },
    {
        id: '02',
        content: 'nihao2'
    },
    {
        id: '03',
        content: 'nihao3'
    }
]

export default class Detail extends Component {
    render() {
        // 从 this.props.location.search 中获取到路由传递的参数 ?id=02&title=消息二
        // 通过 qs.parse() 来把参数转换为对象形式(需要去除第一个 ? )
        const { id, title } = qs.parse(this.props.location.search.slice(1))
        // 根据id来筛选对应的content
        const current = arr.find(item => item.id === id)
        return (
            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{current.content}</li>
            </ul>
        )
    }
}
