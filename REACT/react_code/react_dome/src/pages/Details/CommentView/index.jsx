import React from "react";
import Item from "./Item"

const CommentView = (props)=> {
    return (
        <div>
            <div className="comment-list" style={{'padding':'0 20px'}}>
                {
                    props.data.map((item,index)=>{
                        return <Item data={item} key={index}/>
                    })
                }
            </div>
        </div>
    )
}

export default CommentView