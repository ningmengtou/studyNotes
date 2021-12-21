import React from "react";

import './style.scss'

const Star = (props)=> {
    const star = props.star

    return (
        <div className="star-container">
            {[1, 2, 3, 4, 5].map((item, index) => {
                // star 是参数 = 3
                let lightClass = star >= item ? ' light' : ''
                return <i key={index} className={'icon-star' + lightClass}></i>
            })}
        </div>
    )
}

export default Star