import React from "react";
import './style.scss'
import Star from "../../../../components/Star";
const Item = (props) => {

    const item = props.data
    return (
        <div>
            <div className="comment-item">
                <h3>
                    <i className="icon-user"></i>
                    &nbsp;
                    {item.username}
                </h3>
                <Star star={ item.star }/>
                <p>{item.comment}</p>
            </div>
        </div>
    )
}

export default Item