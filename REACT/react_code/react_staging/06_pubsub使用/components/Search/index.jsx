import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'



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
            // 发布消息 参数一是发布的名称 参数二是发布的数据
            PubSub.publish('updateState',{
                isFirst:false,
                isLoading:true
            })

            axios.get(`http://localhost:3000/api1/search/users?q=${iptVal}`).then(
                res=>{

                PubSub.publish('updateState',{
                    isLoading:false,
                    users:res.data.items
                })
            },err=>{

                PubSub.publish('updateState',{
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
