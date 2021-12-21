import React, { useState } from "react";
import { withRouter } from "react-router";
import './style.scss'

const CityList = (props) => {
    const cityArr = ['北京',
        '上海',
        '杭州',
        '广州',
        '苏州',
        '深圳',
        '哈尔滨',
        '沈阳',
        '长春',
        '呼和浩特',
        '贵阳',
        '桂林',
        '西安',
        '石家庄',
        '太原',
        '成都',
        '长沙',
        '昆明']

    const cityClickHandler = (city) => {
        props.cityClick(city)
        props.history.push('/')
    }

    return (
        <div className="city-list-container">
            <h3>热门城市</h3>
            <ul className="clear-fix">
                {
                    cityArr.map(item => {
                        return <li onClick={() => cityClickHandler(item)} key={item}><span>{item}</span></li>
                    })
                }
            </ul>
        </div>
    )
}

export default withRouter(CityList)