import React from "react";

import Item from "./Item";


const OrderView =(props)=>{

    return(
        <div>
            {
                props.data.map((item,index)=>{
                    return <Item key={index} data={item}/>
                })
            }
        </div>
    )
}

export default OrderView