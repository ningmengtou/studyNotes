import React from "react";
import './style.scss'
const OrderInfo = (props) => {
    return (
        <div className="userinfo-container">
            <p>
                <i className="icon-user"></i>&nbsp;
                <span>{props.username}</span>
            </p>
            <p>
                <i className="icon-map-marker"></i>&nbsp;
                <span>{props.city}</span>
            </p>
        </div>
    )
}

export default OrderInfo