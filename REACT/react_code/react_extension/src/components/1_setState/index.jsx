import React, { Component } from 'react'

export default class Demo extends Component {

    state = {
        count:0
    }

    add = ()=>{
        // 对象形式的 setState 
        // const {count} = this.state
        // this.setState({
        //     count:count+1
        // })

        // 函数形式的 setState 参数是一个函数需要返回一个对象
        // 函数中的参数可以接收到 state props 
        // this.setState((state,props)=>{
        //     return {
        //         count:state.count+1
        //     }
        // })

        // 注意点：setState 的第二个参数可以是一个回调函数，会在执行 render 之后调用(this.setState是异步调用的)
        this.setState({
            count:this.state.count+1
        },()=>{
            console.log('render之后调用的回调函数',this.state.count)
        })
    }


    render() {
        return (
            <div>
                <h2>当前求和为:{this.state.count}</h2>
                <button onClick={this.add}>点击加一</button>
            </div>
        )
    }
}
