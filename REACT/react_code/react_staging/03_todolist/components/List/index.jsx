import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.css'

export default class List extends Component {
    // 对props参数类型限制
    static propTypes={
        todos:PropTypes.array.isRequired,
        updataTodo:PropTypes.func.isRequired,
        deteleTodo:PropTypes.func.isRequired
    }


    render() {
        const {todos,updataTodo,deteleTodo} = this.props

        return (
            <ul className="todo-main">
                {
                    /* 遍历数组给item组件传值 {...todo} 可批量传值 */
                    todos.map(todo=>{
                       return  <Item key={todo.id} {...todo} updataTodo={updataTodo} deteleTodo={deteleTodo}/>
                    })
                }
            </ul>
        )
    }
}
