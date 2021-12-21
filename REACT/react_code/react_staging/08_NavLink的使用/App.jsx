import React, { Component } from 'react'

import {NavLink,Route} from 'react-router-dom'


import Home from './components/Home'
import About from './components/About'



export default class App extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header"><h2>React Router Demo</h2></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/* 在React中用路由链接组件来实现切换组件 to="" 指定切换的路由地址 */}
                            <NavLink activeClassName="demo" className="list-group-item" to="/about">About</NavLink>
                            <NavLink activeClassName="demo" className="list-group-item" to="/home">Home</NavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                            {/* 注册组件 path="" 指定路由地址 component={} 指定切换的组件 */}
                            <Route path="/about" component={About}></Route>
                            <Route path="/home" component={Home}></Route>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
