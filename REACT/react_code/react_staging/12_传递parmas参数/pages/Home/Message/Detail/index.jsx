import React, { Component } from 'react'


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
        // 从 this.props.match.params 中获取到路由传递的参数
        const { id, title } = this.props.match.params
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
