import React, { useEffect, useState } from "react";

import api from "../../../api"
import OrderView from "../OrderView";

const OrderList = (props) => {
    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        api.getOrder({
            username: props.username
        }).then(res => {
            if (res.status === 200) {
                // console.log(res.data.orderData);
                setOrderData(res.data.orderData)
            }
        })

        return ()=> {
            setOrderData([])
        }

    }, [])

    return (
        <div>
            {
                orderData.length > 0 ?
                    <OrderView data={orderData} /> :
                    <div>数据加载中...</div>
            }
        </div>
    )
}

export default OrderList