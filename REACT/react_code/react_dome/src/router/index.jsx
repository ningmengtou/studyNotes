import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from '../pages/Main/Home'
import Life from '../pages/Main/Life'
import User from '../pages/Main/User'
import Shop from '../pages/Main/Shop'
import Layout from "../pages/Main/layout";

import BottomNav from "../components/BottomNav";
import City from '../pages/City/index';
import Search from "../pages/Search";
import Details from "../pages/Details";
import Login from "../pages/Login"
import Order from "../pages/Order";


import '../assets/css/common.scss'
import '../assets/css/font.css'
import '../assets/css/iconfont.css'


const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/city" component={City}></Route>
                <Route path="/details/:id" component={Details}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/order" component={Order}></Route>
                <Route path="/search/:keywords" component={Search}></Route>
                {/* 把四个需要tabbar的组件包裹到 layout 组件中 */}
                <Layout path="/" >
                    <BottomNav />
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route path="/life" component={Life}></Route>
                        <Route path="/user" component={User}></Route>
                        <Route path="/shop" component={Shop}></Route>
                    </Switch>
                </Layout>
            </Switch>
        </Router>
    )
}

export default AppRouter