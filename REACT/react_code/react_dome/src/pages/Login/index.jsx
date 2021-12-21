import React from "react";
import { useDispatch } from "react-redux";
import {setLogin} from "../../redux/actions/login"

import LoginView from './LoginView'

const Login = ()=>{
    const dispatch = useDispatch()

    const loginHandle=(user)=>{
        dispatch(setLogin(user))
        // 把用户信息保存到本地
        localStorage.setItem('goodlive',JSON.stringify(user))
        window.history.back()
    }

    return (
        <div>
            <LoginView onLoginEvent={loginHandle}/>
        </div>
    )
}


export default Login