// 引入 react
import React from "react";
// 引入 reactdom 
import ReactDOM from 'react-dom'
// 引入前端路由
import { BrowserRouter } from "react-router-dom";
// 引入 app 
import App from './App'

// 把组件挂载到 root 上
// 引入 BrowserRouter 组件把整个App包裹起来实现一个路由器统一控制
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'))
