import React, { useState,useEffect,useRef } from "react";

import api from "../../../../api"

import './style.scss'


const Item = (props) => {

    const data = props.data

    const [commentState, setCommentState] = useState(data.commentState)

    const content = useRef()


    const clickHandle = () => {
        setCommentState(1)
    }
    // 提交
    const onSubmitHandler = ()=> {
        console.log(content.current.value);
        if(content.current.value) {
            api.subcomment({
                content:content.current.value
            }).then(res=>{
                console.log(res);
            })
        }
        setCommentState(2)
    }
    // 取消
    const onCancelHandler = ()=> {
        setCommentState(0)
    }

    return (
        <div className="clear-fix order-item-container">
            <div className="order-item-img float-left">
                <img src={data.img} />
            </div>
            <div className="order-item-comment float-right">
                {

                    commentState === 0 ?
                    <button className="btn" onClick={clickHandle}>评价</button>
                    : commentState === 1 ? '' :
                    <button className="unseleted-btn btn">已评价</button>

                }
            </div>
            <div className="order-item-content">
                <span>商户：{data.title}</span>
                <span>类型：{data.houseType}</span>
                <span>价格：￥{data.price}</span>
            </div>
            {
                commentState === 1 ?
                    <div className="comment-text-container">
                        <textarea style={{ width: '100%', height: '80px' }} className="comment-text" ref={content}></textarea>
                        <button className="btn" onClick={onSubmitHandler}>提交</button>
                        <button className="btn unseleted-btn" onClick={onCancelHandler}>取消</button>
                    </div>
                    : ""
            }

        </div>
    )
}

export default Item