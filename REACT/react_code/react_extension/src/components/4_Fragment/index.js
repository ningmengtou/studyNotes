import React, { Component,Fragment } from 'react'

export default class index extends Component {
    render() {
        return (
            // 这里 Fragment 可以替换调 div 可以让结构更加清晰
            <Fragment key={1} >
                <input type="text"  />
                <input type="text"  />
            </Fragment>
        )
    }
}
