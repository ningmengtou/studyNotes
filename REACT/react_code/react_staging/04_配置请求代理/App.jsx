import React, { Component } from 'react'
import axios from 'axios'
export default class App extends Component {

    getStudents = () => {
        axios.get('http://localhost:3000/api1/students').then(res=>{
            console.log(res.data)
        })
    }

    getCars = ()=>{
        axios.get('http://localhost:3000/api2/cars').then(res=>{
            console.log(res.data)
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.getStudents}>点击获取学生信息</button>
                <button onClick={this.getCars}>点击获取汽车信息</button>
            </div>
        )
    }
}
