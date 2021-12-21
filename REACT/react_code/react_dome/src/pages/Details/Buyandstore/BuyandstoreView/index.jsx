import React from "react";
import { withRouter } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { setCollect, removeCollect } from "../../../../redux/actions/collect"
import './style.scss'

const BuyandstoreView = (props) => {
    
    const collects = useSelector(state => state.collect)
    const dispatch = useDispatch()

    // 收藏操作
    const collgeHandle = () => {
        if (props.user.token) {
            if (isCollge()) {
                dispatch(removeCollect(props.id))
            } else {
                dispatch(setCollect(props.id))
            }
        } else {
            props.history.push('/login')
        }
    }

    // 判断当前房子是否被收藏 
    // 收藏了返回 true 没有收藏返回 false 
    const isCollge = () => {
        return collects.some(item => item === props.id)
    }

    return (
        <div>
            <div className="buy-store-container clear-fix">
                <div className="item-container float-left">
                    {
                        isCollge() ?
                            <button className="selected o" onClick={collgeHandle}>已收藏</button> :
                            <button className="selected" onClick={collgeHandle}>收藏</button>
                    }
                </div>
                <div className="item-container float-right">
                    <button>购买</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(BuyandstoreView)