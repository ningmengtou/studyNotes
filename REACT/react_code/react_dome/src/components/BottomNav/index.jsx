import React from "react";
import { NavLink } from "react-router-dom";
import './style.scss'

const BottomNav = () => {
    return (
        <div className="nav-footer">
            <ul className="clear-fix">
                {/* {exact是为了精准匹配只有to中的url和实际url完全一致的时候才会渲染路由页面} */}
                <li>
                    <NavLink exact to="/">
                        <i className="iconfont icon-home"></i>
                        首页
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/shop">
                        <i className="iconfont icon-shop"></i>
                        商城
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/life">
                        <i className="iconfont icon-trophy"></i>
                        生活服务
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/user">
                        <i className="iconfont icon-team"></i>
                        我的
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default BottomNav