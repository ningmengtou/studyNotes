import React from "react";

import './style.scss'

const HomeHotView = (props) => {
    return (
        <div className="hotproduct">
            <h3>{props.title}</h3>
            <div className="hot-container">
                <ul className="clear-fix">
                    {
                        props.homeData.map((element) => {
                            return (
                                <li key={element.id}>
                                    <a href={element.link}>
                                        <img src={element.img} alt={element.title} />
                                        <span>{props.cityName + element.title}</span>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default HomeHotView