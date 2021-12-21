import React, { Component,lazy,Suspense } from 'react'
import { Link,Route } from 'react-router-dom'


// import Home from './Home/index'
// import About from './About/index'

const Home = lazy(()=>import('./Home'))
const About = lazy(()=>import('./About'))

export default class Demo extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header"><h2>React Router Demo</h2></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">

                            <Link className="list-group-item" to="/about">About</Link>
                            <Link className="list-group-item" to="/home">Home</Link>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {/* 懒加载的路由组件需要被 Suspense 包裹 */}
                                <Suspense fallback={<h2>Loading...</h2>}>
                                    <Route path="/about" component={About}></Route>
                                    <Route path="/home" component={Home}></Route>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
