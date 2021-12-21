import React from "react";

import classNames from "classnames";

import './style.scss'


const Pagination = (props) => {
    // fill 用于向数组填充指定元素
    let arr = new Array(props.len).fill(1)

    return (
        <div className="swiper-pagination">
            <ul>
                {
                    arr.map((element, index) => {
                        return <li className={props.index === index ? 'selected' : ''} key={index}></li>
                    })
                }
            </ul>
        </div>
    )
}

export default Pagination