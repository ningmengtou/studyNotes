// 引入组件类 按需导入 Component
import React, { Component } from "react";
// 引入组件
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'

import './App.css'

export default class App extends Component {
    // 状态在哪里  操作状态的方法就在哪里

    // 初始化state
    state = {
        todos: [
            { id: 1, name: '吃饭', done: true },
            { id: 2, name: '睡觉', done: true },
            { id: 3, name: '敲代码', done: false }
        ]
    }

    // 添加任务
    addTodo = (todoObj) => {
        const { todos } = this.state
        // 把最新添加的任务添加到todos数组中
        this.setState({
            todos: [todoObj, ...todos],
            allCheck:false
        })
    }

    // 更新任务状态是否完成
    updataTodo = (id, done) => {
        const { todos } = this.state
        const newTodos = todos.map(todoObj => {

            if (id === todoObj.id) {
                // 通过 ... 拷贝一份对象 并且 done 属性重新赋值
                return { ...todoObj, done }
            } else {
                // 如果id不一致则直接返回原来的对象
                return todoObj
            }
        })
        this.setState({
            todos: newTodos
        })
    }

    // 删除任务
    deteleTodo=(id)=>{
        const {todos} = this.state
        // 根据id来删除todes中的任务
        this.setState({
            todos:todos.filter(todo=>todo.id !== id)
        })
    }

    // 清空选中任务
    clearDone=()=>{
        const {todos} = this.state
        // 根据done的值来删除todes中的任务
        this.setState({
            todos:todos.filter(todo=>todo.done !== true)
        })
    }

    // 全选任务
    checkAllHandle = (done)=>{
        const {todos} = this.state
        // 接收 done 布尔值来同意改变todos数组中是否选中
        this.setState({
            todos:todos.map(todo=>{
                return {...todo,done}
            })
        })
    }

    render() {
        const { todos } = this.state
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo} />
                    <List todos={todos} updataTodo={this.updataTodo}  deteleTodo={this.deteleTodo}/>
                    <Footer  clearDone={this.clearDone} todos={todos} checkAllHandle={this.checkAllHandle}/>
                </div>
            </div>
        )
    }
}