import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { withRouter } from "react-router";

import OrderInfo from "./OrderInfo";
import OrderList from "./OrderList";



const Order = (props) => {

    const username = useSelector(state => state.login.user.username)
    const city = useSelector(state => state.city.cityName)

    useEffect(() => {
        if (!username) {
            props.history.push('/login')
        }
    }, [])

    return (
        <div>
            <OrderInfo city={city} username={username} />
            <OrderList username={username}/>
        </div>
    )
}

export default withRouter(Order)