import React from 'react'
import { withRouter } from 'react-router'

import './style.scss'

const PubHeader = (props) => {

    const clickBackHandle = () => {
        props.history.go(-1)
    }


    return (
        <div id="common-header">
            <span className="back-icon" onClick={clickBackHandle}>
                <i className="icon-chevron-left"></i>
            </span>
            <h1>{props.title}</h1>
        </div>
    )
}

// 通过 withRouter 让一般组件也有路由api
export default withRouter(PubHeader)