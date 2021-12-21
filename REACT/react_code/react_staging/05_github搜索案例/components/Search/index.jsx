import React, { Component } from 'react'
import axios from 'axios'


export default class index extends Component {

    state = {
        iptVal: '',

    }

    // 搜索关键字
    search = () => {
        const {iptVal} = this.state
        if(iptVal.trim() === '') {
            alert('请输入关键字')
        }else {
            // 在发送请求之前修改状态
            this.props.updateState({
                isFirst:false,
                isLoading:true
            })


            axios.get(`http://localhost:3000/api1/search/users?q=${iptVal}`).then(
                res=>{
                this.props.updateState({
                    isLoading:false,
                    users:res.data.items
                })
            },err=>{
                this.props.updateState({
                    isLoading:false,
                    err:'请求报错'
                })
            })
        }
    }

    // 文本输入
    inputChange = (event) => {
        this.setState({
            iptVal: event.target.value
        })
    }


    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input type="text"
                        placeholder="enter the name you search"
                        onChange={this.inputChange} />&nbsp;
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        )
    }
}
