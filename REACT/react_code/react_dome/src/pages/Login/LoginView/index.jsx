import React,{useState} from "react";
import api from "../../../api"
import { useDispatch } from "react-redux";

import './style.scss'
const LoginView = (props) => {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    // 表单提交事件
    const onSubmit = (e)=>{
        // 取消跳转页面默认事件
        e.preventDefault()
        api.login({
            username,
            password
        }).then(res=>{
            if(res.status === 200) {
                // 获取到token返回给父级
                props.onLoginEvent(res.data)
            }
        })
    }

    // 表单输入事件
    const onchangeHandle=(e)=>{
        if(e.target.name === 'username') {
            setUsername(e.target.value)
        }

        if(e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }


    return (
        <div id="login-container">
            <form onSubmit={onSubmit}>
                <div className="input-container phone-container">
                    <i className="icon-tablet"></i>
                    <input
                        value={username}
                        name="username"
                        placeholder="用户名/手机号"
                        onChange={onchangeHandle}
                    />
                </div>
                <div className="input-container password-container">
                    <i className="icon-key"></i>
                    <button>发送验证码</button>
                    <input type="text" 
                    placeholder="输入验证码" 
                    name="password"
                    value={password}
                    onChange={onchangeHandle}
                    />
                </div>
                <button className="btn-login" >登录</button>
            </form>
        </div>
    )
}


export default LoginView