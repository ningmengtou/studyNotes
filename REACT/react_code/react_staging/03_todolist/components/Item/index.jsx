import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Item extends Component {
    // 对props参数类型限制
    static propTypes = {
        updataTodo:PropTypes.func.isRequired,
        deteleTodo:PropTypes.func.isRequired
    }


    state = {
        btnIsShow: 'none'
    }

    iptChange = (id) => {
        return (event) => {
            // 调用 app 中的方法来操作todos数组
            this.props.updataTodo(id,event.target.checked)
        }
    }

    // 鼠标移出移入绑定同一个事件 根据传值的不同来显示隐藏按钮
    enter = (boolean) => {
        return () => {
            this.setState({
                btnIsShow: boolean ? 'block' : 'none'
            })
        }
    }

    // 删除任务
    delete = (id)=>{
        return ()=>{
            let str = `你确定要删除-${this.props.name}-任务吗?`
            if(window.confirm(str)) {
                this.props.deteleTodo(id)
            }
        }
    }


    render() {
        const { id, name, done } = this.props

        return (
            <li onMouseEnter={this.enter(true)} onMouseLeave={this.enter(false)}>
                <label>
                    <input type="checkbox" checked={done} onChange={this.iptChange(id)} />
                    <span>{name}</span>
                </label>
                <button className="btn btn-danger" onClick={this.delete(id)} style={{ display: this.state.btnIsShow }}>删除</button>
            </li>
        )
    }
}
