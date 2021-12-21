import React from "react";

import { useSelector } from "react-redux";
import BuyandstoreView from "./BuyandstoreView";

const Buyandstore = (props) => {

    const params = useSelector(state => state.login)
    return (
        <div>
            <BuyandstoreView user={params.user} id={props.id}/>
        </div>
    )
}

export default Buyandstore