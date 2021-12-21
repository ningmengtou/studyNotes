import React, { Component } from 'react'
import { withRouter } from 'react-router'
class Header extends Component {
    goBackClick = () => {
        this.props.history.goBack()
    }
    goForward = () => {
        this.props.history.goForward()

    }
    goClick = () => {
        this.props.history.go(2)

    }
    render() {
        return (
            <div className="row">
                <div className="col-xs-offset-2 col-xs-8">
                    <div className="page-header"><h2>React Router Demo</h2></div>
                    <button onClick={this.goBackClick}>回退</button>
                    <button onClick={this.goForward}>前进</button>
                    <button onClick={this.goClick}>去</button>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
