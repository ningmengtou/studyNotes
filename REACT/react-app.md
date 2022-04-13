##### 通过react脚手架创建项目

```
第一步，全局安装：npm i -g create-react-app
第二步，切换到想创项目的目录，使用命令：create-react-app hello-react
第三步，进入项目文件夹：cd hello-react
第四步，启动项目：npm start
```

##### react脚手架结构

```
public ---- 静态资源文件夹
		favicon.icon ------ 网站页签图标
		index.html -------- 主页面
		logo192.png ------- logo图
		logo512.png ------- logo图
		manifest.json ----- 应用加壳的配置文件
		robots.txt -------- 爬虫协议文件
src ---- 源码文件夹
		App.css -------- App组件的样式
		App.js --------- App组件
		App.test.js ---- 用于给App做测试
		index.css ------ 样式
		index.js ------- 入口文件
		logo.svg ------- logo图
		reportWebVitals.js
			--- 页面性能分析文件(需要web-vitals库的支持)
		setupTests.js
			---- 组件单元测试的文件(需要jest-dom库的支持)
```

##### vscode 插件代码块

```
rcc  类式组件
rfc  函数组件
rafce 箭头函数组件

```

##### 脚手架配置代理

```js
//在 src 文件中添加 setupProxy.js 文件(文件名是唯一的)
//修改了配置文件记住要重新启动项目
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        // 可配置多个代理
        proxy('/api1',{ //遇见 /api1 前缀的请求就会触发代理配置
            target:'http://localhost:5000', // 请求转发给谁
            changeOrigin:true, // 控制服务器收到请求头的host值
            pathRewrite:{'^/api1':''} // 重写请求路径(必须)
        }),
        proxy('/api2',{
            target:'http://localhost:5001',
            changeOrigin:true,
            pathRewrite:{'^/api2':''}
        })
    )
}

//在请求时需要携带请求前缀
getStudents = () => {
    axios.get('http://localhost:3000/api1/students').then(res=>{
        console.log(res.data)
    })
}
```

##### 组件的通信  发布和订阅消息

```js
//拿到数据的组件发布消息  需要展示数据的组件订阅消息

import PubSub from 'pubsub-js'

// 发布消息 参数一是发布的名称 参数二是发布的数据
PubSub.publish('updateState',{
    isFirst:false,
    isLoading:true
})

//订阅消息
// 组件挂载完毕生命周期
componentDidMount() {
    // 定义消息 参数一是发布名称，参数二是函数(参数一是发布名称，参数二是数据)
    // 订阅消息有返回值 可以绑定到组件实例上
    this.listState = PubSub.subscribe('updateState',(_,data)=>{
        this.setState(data)
    })
}

// 组件卸载之前
componentWillUnmount() {
    // 组件卸载之前取消订阅的的消息
    PubSub.unsubscribe(this.listState)
}
```

##### 多重三元表达式判断

```jsx
const { users, isFirst, isLoading, err } = this.state
        return (
            <div className="row">
                {/* 多重三元表达式判断 */}
                {
                    isFirst ? <h2>欢迎使用，输入关键字搜索即可</h2> :
                    isLoading ? <h2>Loading...</h2> :
                    err ? <h2>{err}</h2> :
                    users.map(user => {
                        return (
                            <div className="card" key={user.id}>
                                <a href={user.html_url} target="_blank" rel="noreferrer">
                                    <img alt="avatar" src={user.avatar_url} style={{ width: '100px' }} />
                                </a>
                                <p className="card-text">{user.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
```

##### react前端路由的基本使用

```JS
import {Link,Route} from 'react-router-dom'

{/* 在React中用路由链接组件来实现切换组件 to="" 指定切换的路由地址 */}
<Link className="list-group-item" to="/about">About</Link>
<Link className="list-group-item" to="/home">Home</Link>
                            
{/* 注册组件 path="" 指定路由地址 component={} 指定切换的组件 */}
<Route path="/about" component={About}></Route>
<Route path="/home" component={Home}></Route>

// 引入 BrowserRouter 组件把整个App包裹起来实现一个路由器统一控制
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'))
```

##### react的路由组件和一般组件的区别

```js
1.写法不同
一般组件 <Demo/>
路由组件 <Route path="/demo" component={Demo}></Route>

2.存放文件位置不同
一般组件 components
路由组件 pages

3.接收的props不同：
一般组件 在组件标签中写什么就接收什么
路由组件 接收三个固定的属性
history:
        go: ƒ go(n)
        goBack: ƒ goBack()
        goForward: ƒ goForward()
        push: ƒ push(path, state)
        replace: ƒ replace(path, state)
location:
        pathname: "/home"
        search: ""
        state: undefined
match:
        params: {}
        path: "/home"
        url: "/home"

```

##### NavLink(高亮组件)的使用

```js
import {NavLink,Route} from 'react-router-dom

// activeClassName 定义的就是添加高亮的样式
<NavLink activeClassName="demo" className="list-group-item" to="/home">Home</NavLink>
```

##### 封装NavLink组件

```js
//MyNavLink 自闭合标签中props属性中有 children 属性可以接收标签体内容
<MyNavLink to="/about">About</MyNavLink>

    
import { NavLink } from 'react-router-dom'
//NavLink 通过{...this.props}把接收到的标签属于展示
<NavLink activeClassName="demo" className="list-group-item" {...this.props} />
```

##### Switch的使用 

```js
//可以把多个路由包裹起来
//匹配到一个路由就不会继续往下匹配
//一般情况下 path 和 component 是一一对应关系 Switch 可以提高匹配效率
import {Switch,Route} from 'react-router-dom'

<Switch>
<Route path="/about" component={About}></Route>
<Route path="/home" component={Home}></Route>
<Route path="/home" component={Test}></Route>
</Switch>
```

##### 解决样式丢失问题

```js
//原本样式地址：<link rel="stylesheet" href="./css/bootstrap.css">

//修改方案
<link rel="stylesheet" href="/css/bootstrap.css">
<link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css">
```

##### Redirect 的使用

```js
//路由重定向
import {NavLink,Route,Redirect} from 'react-router-dom'

// Redirect写在注册路由的最后面 当所有路由都没匹配到时触发 Redirect
<Switch>
<Route path="/about" component={About}></Route>
<Route path="/home" component={Home}></Route>
<Redirect to="/about" />
</Switch>
```

##### 二级路由的使用

```js
// Home
return (
            <div>
                <h2>Home组件内容</h2>
                <div>
                    <ul className="nav nav-tabs">
                        <li>
                            <MyNavLink to="/home/news">News</MyNavLink>
                        </li>
                        <li>
                            <MyNavLink to="/home/message">Message</MyNavLink>
                        </li>
                    </ul>
                    <Switch>
                        <Route path="/home/news" component={News} />
                        <Route path="/home/message" component={Message} />
                        <Redirect to="/home/news" />
                    </Switch>
                </div>
            </div>
        )
        
// News
        return (
            <ul>
            <li>news001</li>
            <li>news002</li>
            <li>news003</li>
            </ul>
        )

// Message
        return (
            <div>
                <ul>
                    <li>
                        <a href="/message1">message001</a>&nbsp;&nbsp;
                    </li>
                    <li>
                        <a href="/message2">message002</a>&nbsp;&nbsp;
                    </li>
                    <li>
                        <a href="/message/3">message003</a>&nbsp;&nbsp;
                    </li>
                </ul>
            </div>
        )
//注意点：1.子路由的路由地址需要携带父级路由 2.路由的匹配是按照注册路由的顺序进行的
```

##### 通过 parmas 来传递参数

```js
//message组件
return (
            <div>
                <ul>
                    {
                        messageArr.map(item => {
                            return (
                                <li key={item.id}>
                                    {/* 通过 parmas 传递参数需要把参数写在路径上(携带参数) */}
                                    <Link to={`/home/message/detail/${item.id}/${item.title}`}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr />
                {/* 通过 parmas 接收参数需要在路径中声明接收的 key (声明接收)  */}
                <Route path="/home/message/detail/:id/:title" component={Detail} />
            </div>
        )
        
   //Detail组件
   render() {
        // 从 this.props.match.params 中获取到路由传递的参数
        const { id, title } = this.props.match.params
        // 根据id来筛选对应的content
        const current = arr.find(item => item.id === id)
        return (
            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{current.content}</li>
            </ul>
        )
    }
```

##### 通过 search来传递参数

```jsx
//Message组件
        return (
            <div>
                <ul>
                    {
                        messageArr.map(item => {
                            return (
                                <li key={item.id}>
                                    {/* 通过 search 传递参数需要把参数写在路径上 */}
                                    <Link to={`/home/message/detail?id=${item.id}&title=${item.title}`}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr />
                {/* 通过 search 接收参数不需要声明  */}
                <Route path="/home/message/detail" component={Detail} />
            </div>
        )

//Detail组件
import qs from 'querystring'

    render() {
        // 从 this.props.location.search 中获取到路由传递的参数 ?id=02&title=消息二
        // 通过 qs.parse() 来把参数转换为对象形式(需要去除第一个 ? )
        const { id, title } = qs.parse(this.props.location.search.slice(1))
        // 根据id来筛选对应的content
        const current = arr.find(item => item.id === id)
        return (
            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{current.content}</li>
            </ul>
        )
    }
```

##### 通过 state 传递参数

```js
//Message组件
return (
            <div>
                <ul>
                    {
                        messageArr.map(item => {
                            return (
                                <li key={item.id}>
                                    {/* 通过 state 传递参数需要给 to 赋值对象  pathname定义路径*/}
                                    <Link to={{ pathname: '/home/message/detail', state: { id: item.id, title: item.title } }}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr />
                {/* 通过 state 接收参数不需要声明  */}
                <Route path="/home/message/detail" component={Detail} />
            </div>
        )
   
//Detail组件
   render() {
        // 通过 this.props.location.state 可以接收到传递过来的参数
        const {id,title} = this.props.location.state

        // // 根据id来筛选对应的content
        const current = arr.find(item => item.id === id)
        return (
            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{current.content}</li>
            </ul>
        )
    }
```

##### 路由开启 replace 模式 默认是 push 模式

```js
<Link replace  to={{ pathname: '/home/message/detail', state: { id: item.id, title: item.title } }}>{item.title}</Link>
```

##### 编程式导航跳转

```jsx
    // replace编程式跳转
    replaceShow = (id, title) => {、
    	//parmas参数
        this.props.history.replace(`/home/message/detail/${id}/${title}`)
        //search参数
        this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)
        //state参数 参数一是路径  参数二是传递参数(对象)
        this.props.history.replace('/home/message/detail',{id,title})
    }

    // push编程式跳转
    pushShow = (id, title) => {
        //parmas参数
        this.props.history.push(`/home/message/detail/${id}/${title}`)
        //search参数
        this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)
        //state参数 参数一是路径  参数二是传递参数(对象)
        this.props.history.push('/home/message/detail',{id,title})
    }
```

##### withRouter 的使用

```jsx
//作用：让一般组件拥有路由组件的api  withRouter() 返回的是一个新的组件实例
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
```

##### antd中按需引入样式

```js
//1.npm i react-app-rewired customize-cra    
//2.修改package.json 把 react-scripts 改为 react-app-rewired
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  }
//3.npm i babel-plugin-import
//4.在根目录中创建该文件：config-overrides.js  并且写好配置
 const { override, fixBabelImports } = require('customize-cra');

 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: 'css',
   }),
 );
//5.重启项目
```

##### 使用redux 简单版

```js
//1.npm install redux
//2.创建文件
./redux
	./store.js
	./count_reducer.js
//3. store.js
// 引入 createStore 用于创建 store 
import { createStore } from "redux";
// 引入 reducer 方法
import countReducer from './count_reducer'

// 通过createStore创建store(参数是一个reducer) 并且暴露出去
export default createStore(countReducer)
//4. count_reducer.js

// reducer 本质就是一个函数,有两个参数分别是:之前的状态(preState) 动作对象(action)
// 定义初始值
const initState = 0
// 第一个执行 reducer 时是定义初始状态 preState 是undefined
// 通过默认参数给到最开始的值为 0
export default function countReducer(preState = initState,action) {
    // 结构获取方法名(type)和数据(data)
    const {type,data} = action
    switch (type) {
        case 'increment': // 加法
            return preState + data
        case 'decrement': // 减法
            return preState - data
        default: //方法名没有匹配上直接返回 preState
            return preState
    }
}
//5.组件内使用 store
// 加法
increment = () => {
    const { value } = this.selectNum
    // store.dispatch 实现分发 action 
    // type 指定 方法名称需要和 reducer 中的方法一一对应 data 指定 值
    store.dispatch({
        type: 'increment',
        data: value * 1
    })
}
store.getState() // 可以直接获取redux中状态的值
//6.index.js
import store from './redux/store'
import App from "./App";

ReactDOM.render(<App />, document.getElementById('root'))
// 直接在 index.js 中监听 store 的状态变更，更新则直接调用render从新更新页面
store.subscribe(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
})
```

##### 异步 action (不是必须要使用的)

```js
//同步 action 指一般js对象 {type：'increment',data:1}
//异步 action 指是一个函数 action
//需要安装 redux-thunk npm install redux-thunk

//把在组件中需要处理的异步操作放置在 action 中
// setTimeout(() => {
store.dispatch(incrementAsyncAction(value * 1,500))
// }, 500);


// 异步 action 返回值是一个需要异步处理的函数
export const incrementAsyncAction = (data,time)=>{
    //这个返回的函数是通过 store 调用的可以接收到一个 dispatch 参数
    return (dispatch)=>{
        // 异步处理中也是调用同步 action 
        setTimeout(()=>{
            // 调用 incrementAction 生成 action 对象
            dispatch(incrementAction(data))
        },time)
    }
}

//store.js
// 引入 createStore 用于创建 store 
import { createStore,applyMiddleware } from "redux";
// 引入 reducer 方法
import countReducer from './count_reducer'
// 引入 thunk 来让store可以识别函数式的action
import thunk from "redux-thunk";

// 通过createStore创建store(参数是一个reducer) 并且暴露出去
// 使用 thunk 需要多使用一个参数 applyMiddleware(thunk)
export default createStore(countReducer,applyMiddleware(thunk))
```

##### react-redux的基本使用

```jsx
1.明确两个概念
	ui组件中不能使用任何关于redux的api，只负责呈现页面的交互
	容器组件负责和redux通信，把结果状态传递给ui组件，和ui组件父子组件关系
2.如何创建一个容器组件？————通过react-redux中的connect函数
	connect(mapStateToProps,mapDispatchToProps)(UI组件)
	mapStateToProps:映射状态，返回一个对象
	mapDispatchToProps:映射操作状态的方法，返回值一个对象
3.备注：容器组件中的store是通过props传递过去的，而不是在容器组件中直接引入

//容器组件
// 引入 ui 组件
import Count from '../../components/Count'
// 从 react-redux 中导入 connect 用于链接 ui 组件
import { connect } from 'react-redux'
// 引入 actions 
import { incrementAction, decrementAction, incrementAsyncAction } from '../../redux/count_action'

// mapStateToProps 函数返回一个对象 用于传递 redux 状态 实现容器组件和ui组件状态通信
// 这里 state 参数是 store.getState() 的返回值
function mapStateToProps(state) {
    return { count: state }
}

// mapDispatchToProps 函数也是返回对象，用于传递处理状态的方法
// 这里 dispatch 参数是 store.dispatch 方法通过 dispatch 来直接改变redux的状态
function mapDispatchToProps(dispatch) {
    // 对象的 key 是方法名 value 是回调的方法
    return {
        jia: number => dispatch(incrementAction(number)),
        jian: number => dispatch(decrementAction(number)),
        jiaAsync: (number, time) => dispatch(incrementAsyncAction(number, time))
    }
}
// 使用 connect()() 获取容器组件并且导出
// 第一个调用可以接受两个函数参数 两个函数都有返回值
export default connect(mapStateToProps, mapDispatchToProps)(Count)
```

##### react-redux优化写法

```js
1.容器组件和UI组件整合成一个文件 jsx
2.不需要给每一个容器组件传递 store 给 <APP /> 包裹 <Provider store={store}>
3.使用react-reduex不需要自己检测redux中的状态改变，容器组件能自己完成这个工作
4.mapDispatchToProps可以直接写成一个对象
5.一个组件和redux通信需要几步？
	首先定义好UI组件，不暴露
	引入 connect 函数生成一个容器组件并且暴露
        connect(
            state=>({key:state}),
            {
                key:.....action
            }
        )(UI组件)
	在UI组件中通过this.props.xxxx读取和操作状态
```

##### 多个组件共享状态

```js
注意点：在 store 文件中需要引入 combineReducers 对多个 reducer 进行合并，合并之后的状态是个对象

// 引入 createStore 用于创建 store 
import { createStore,applyMiddleware,combineReducers } from "redux";
// 引入 count reducer 方法
import countReducer from './reducers/count'
import personReducer from './reducers/person'
// 引入 thunk 来让store可以识别函数式的action
import thunk from "redux-thunk";

// combineReducers 方法用于合并所有的reducers
// 参数是一个对象 key 为状态中的key value 为 reducer 
const allReducer = combineReducers({
    count:countReducer,
    persons:personReducer
})
// 通过createStore创建store(参数是一个reducer) 并且暴露出去
// 使用 thunk 需要多使用一个参数 applyMiddleware(thunk)
export default createStore(allReducer,applyMiddleware(thunk))
```

##### react-redux开发者工具的使用

```js
1.npm install redux-devtools-extension
2.在store文件中配置
	import {composeWithDevTools} from 'redex-devtools-extension'
	const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
```

##### 项目打包运行

```
1.npm run-script build
2.serve build
```

