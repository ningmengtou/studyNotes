import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Footer extends Component {
    static propTypes = {
        clearDone:PropTypes.func.isRequired
    }

    // 清除所有完成任务
    clear = ()=>{
        this.props.clearDone()
    }

    // 全选按钮事件
    checkAll =(event)=>{
        console.log(event.target.checked)
        this.props.checkAllHandle(event.target.checked)
    }

    render() {
        const {todos} = this.props
        // 总数
        const total = todos.length
        // 已完成任务数
        const dones = todos.reduce((pre,cur)=>{
            // 任务中的 done 为 true 则pre加一 为 false则不变
           return cur.done ? ++pre : pre
        },0)

        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox"  
                    checked={total === dones && total !== 0? true : false} 
                    onChange={this.checkAll}/>
                </label>
                <span>
                    <span>已完成{dones}</span> / 全部{total}
                </span>
                <button className="btn btn-danger" onClick={this.clear}>清除已完成任务</button>
            </div>
        )
    }
}
