import React from "react";

import DetailsInfo from "./DetailsInfo";

const Details = (props) => {

    const { id } = props.match.params

    return (
        <div>
            <DetailsInfo id={id}/>
        </div>
    )
}

export default Details