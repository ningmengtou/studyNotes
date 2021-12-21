import React, { Component } from 'react'


import Search from './components/Search'
import List from './components/List'


export default class App extends Component {

    // 初始化状态
    state = {
        isFirst:true,//是否第一次登录
        users:[],//用户信息
        isLoading:false,//是否等待
        err:''//错误信息
    }

    // 修改状态 直接传入一个对象
    updateState=(state)=>{
        this.setState(state)
    }

    render() {
        return (
            <div className="container">
                <Search updateState={this.updateState}/>

                <List {...this.state}/>
            </div>
        )
    }
}
