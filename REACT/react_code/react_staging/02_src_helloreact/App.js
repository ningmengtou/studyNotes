// 引入组件类 按需导入 Component
import React,{Component} from "react";
// 引入组件
import Hello from "./components/Hello/Hello";
import Welcome from "./components/Welcome/Welcome";


export default class App extends Component{
    render () {
        return (
            <div>
                <Hello/>
                <Welcome/>
            </div>
        )
    }
}