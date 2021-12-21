import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'


export default class index extends Component {

    // 初始化状态
    state = {
        isFirst:true,//是否第一次登录
        users:[],//用户信息
        isLoading:false,//是否等待
        err:''//错误信息
    }

    // 组件挂载完毕生命周期
    componentDidMount() {
        // 定义消息 参数一是发布名称，参数二是函数(参数一是发布名称，参数二是数据)
        // 订阅消息有返回值 可以绑定到组件实例上
        this.listState = PubSub.subscribe('updateState',(_,data)=>{
           this.setState(data)
        })
    }

    // 组件卸载之前
    componentWillUnmount() {
        // 组件卸载之前取消订阅的的消息
        PubSub.unsubscribe(this.listState)
    }


    render() {
        const { users, isFirst, isLoading, err } = this.state
        return (
            <div className="row">
                {/* 多重三元表达式判断 */}
                {
                    isFirst ? <h2>欢迎使用，输入关键字搜索即可</h2> :
                    isLoading ? <h2>Loading...</h2> :
                    err ? <h2>{err}</h2> :
                    users.map(user => {
                        return (
                            <div className="card" key={user.id}>
                                <a href={user.html_url} target="_blank" rel="noreferrer">
                                    <img alt="avatar" src={user.avatar_url} style={{ width: '100px' }} />
                                </a>
                                <p className="card-text">{user.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
