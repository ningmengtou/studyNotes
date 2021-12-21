import React from "react";
import { Link } from "react-router-dom";

import SearchIput from "../SearchIput";
import { useSelector } from "react-redux";

import './style.scss'

const HeadNav = (props) => {
    const keywords = useSelector(state=>state.search)

    return (
        <div id="home-header" className="clear-fix">
            <div className="home-header-left float-left">
                <Link to="/city">
                    <span>{props.city}</span>
                    <i className="icon-angle-down"></i>
                </Link>
            </div>
            <div className="home-header-right float-right">
                <Link to="/order">
                    <i className="iconfont icon-car"></i>
                </Link>
            </div>
            <div className="home-header-middle">
                <div className="search-container">
                    <i className="icon-search"></i>
                    <SearchIput  keywords={keywords}/>
                </div>
            </div>
        </div>
    )
}

export default HeadNav