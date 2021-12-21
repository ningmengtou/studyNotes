import React, { Component } from 'react'
import {nanoid} from 'nanoid'
import PropTypes from 'prop-types'
import './index.css'

export default class Header extends Component {

    // 对props参数类型限制
    static propTypes = {
        addTodo:PropTypes.func.isRequired
    }

    onKeyUp = (event)=>{
        // 结果赋值 获取节点和按键码
        const {target,keyCode} = event
        if(keyCode !== 13) return
        if(target.value.trim() === '') {
            alert('请输入任务名称')
            return
        }
        let obj = {
            name:target.value,
            id:nanoid(),
            done:false
        }
        // 通过父级传递过来的函数把新添加的任务传递过去
        this.props.addTodo(obj)
        // 清空文本内容
        target.value = ''
    }


    
    render() {
        return (
            <div className="todo-header">
                <input type="text" onKeyUp={this.onKeyUp}  placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        )
    }
}
